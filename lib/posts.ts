import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import remarkHtml from "remark-html";

const postsDirectory = path.join(process.cwd(), "posts");

// 格式化gray-matter数据
const dateStripped = (obj: { data?: any }): { data?: any } => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    let value = obj[key];
    if (value !== null) {
      // If array, loop...
      if (Array.isArray(value)) {
        value = value.map((item) => dateStripped(item));
      }
      // ...if property is date/time, stringify/parse...
      else if (
        typeof value === "object" &&
        typeof value.getMonth === "function"
      ) {
        value = JSON.parse(JSON.stringify(value));
      }
      // ...and if a deep object, loop.
      else if (typeof value === "object") {
        value = dateStripped(value);
      }
    }
    newObj[key] = value;
  });
  return newObj;
};

// index page blog 列表
export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    return {
      id,
      ...(dateStripped(matterResult).data) as { date: string; title: string },
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

// 返回动态路由id
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        id: encodeURI(fileName.replace(/\.md$/, "")),
      },
    };
  });
}

// 获取单个博客的内容
export async function getPostData(id) {
  console.log("id 11", id);
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);
  const processedContent = await remark()
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...(dateStripped(matterResult).data) as { date: string; title: string },
  };
}
