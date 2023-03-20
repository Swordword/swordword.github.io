import { InferGetStaticPropsType } from 'next'
import Link from 'next/link'
import { css } from '@emotion/react'
// Local
import Layout from '@/layout'
import { getTagData } from '@/lib/posts'

const tagColorList = [
  {
    bgColor: '#409eff',
    tagColor: '#f56c6c',
  },
  {
    bgColor: '#67c23a',
    tagColor: '#909399',
  },
  {
    bgColor: '#909399',
    tagColor: '#67c23a',
  },
  {
    bgColor: '#f56c6c',
    tagColor: '#409eff',
  },
]

function Index({ tagList }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout>
      <div
        css={css`
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
      `}
      >
        {tagList.map((a) => {
          const selectColor = tagColorList[Math.floor(Math.random() * 4)]
          return (
            <span
              key={a.tag}
              css={css`
              width: 25%;
              margin-bottom: 12px;
            `}
            >
              <span
                css={css`
                position: relative;
              `}
              >
                <Link href={`/tag/${a.tag}`}>
                  <span
                css={css`
                    display: inline-block;
                    border-radius: 4px;
                    border: 1px solid #d9ecff;
                    background-color: ${selectColor.bgColor};
                    color: #fff;
                    padding: 0 10px;
                    cursor: pointer;
                  `}
              >
                {a.tag}
              </span>
                </Link>
                <span
                  css={css`
                  position: absolute;
                  top: 0;
                  right: 10px;
                  transform: translateY(-50%) translateX(100%);
                  background-color: ${selectColor.tagColor};
                  border-radius: 10px;
                  color: #fff;
                  display: inline-block;
                  font-size: 12px;
                  height: 18px;
                  line-height: 18px;
                  padding: 0 6px;
                  text-align: center;
                  white-space: nowrap;
                  border: 1px solid #fff;
                `}
                >
                  {a.length}
                </span>
              </span>
            </span>
          )
        })}
      </div>
    </Layout>
  )
}
export const getStaticProps = async () => {
  const tagList = await getTagData()
  console.log('tagList', tagList)
  return {
    props: {
      tagList,
    },
  }
}

export default Index
