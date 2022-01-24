---
title: GraphQl探秘
date: 2022-01-10 23:46:37
category: category
tag:
cover:
description: description
---

操作类型 Operation Type：

* query 查询：
* mutation 变更：
* substription 订阅：

对象类型与标量类型

GraphQL 查询会同等看待单个项目或者一个列表的项目,查询一个字段结果有可能是一项或者一个数组

#### 查询与变更

约定变更服务端数据通过 `mutation`语句表示

```graphql
mutation CreateReviewForEpisode($ep: Episode!, $review: ReviewInput!) {
  createReview(episode: $ep, review: $review) {
    stars
    commentary
  }
}
{
  "ep": "JEDI",
  "review": {
    "stars": 5,
    "commentary": "This is a great movie!"
  }
}
```

**查询字段时，是并行执行，而变更字段时，是线性执行，一个接着一个。**

#### 内联片段 Inline Fragments

如果查询的子弹返回的是接口或者联合类型，需要使用**内联片段**取出下层具体类型的数据

```
query HeroForEpisode($ep: Episode!) {
  hero(episode: $ep) {
    name
    ... on Droid {
      primaryFunction
    }
    ... on Human {
      height
    }
  }
}
{
  "ep": "JEDI"
}
```

返回的hero 只有是Droid类型时会有promaryFunction字段，只有是Human字段时会有height字段

#### 元字段 Meta fields

元字段中的 __typename可以放置在查询的任何位置上，获取该位置对象的类型名称

```
{
  search(text: "an") {
    __typename
    ... on Human {
      name
    }
    ... on Droid {
      name
    }
    ... on Starship {
      name
    }
  }
}
# res:
{
  "data": {
    "search": [
      {
        "__typename": "Human",
        "name": "Han Solo"
      },
      {
        "__typename": "Human",
        "name": "Leia Organa"
      },
      {
        "__typename": "Starship",
        "name": "TIE Advanced x1"
      }
    ]
  }
}
```

### Schema 与类型

#### 对象类型与字段

```GraphQL
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```

Character 是 GraphQL对象类型，







[未完待续...]