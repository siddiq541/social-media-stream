import { EntitySchema } from "typeorm";

export const Post = new EntitySchema({
  name: "Post",
  tableName: "posts",

  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },

    description: {
      type: "text",
    },

    image: {
      type: "text",
      nullable: true,
    },

    shares: {
      type: "int",
      default: 0,
    },

    createdAt: {
      type: "timestamp",
      createDate: true,
    },

    updatedAt: {
      type: "timestamp",
      updateDate: true,
    },
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      joinColumn: true,
      nullable: false,
      onDelete: "CASCADE",
    },

    comments: {
      type: "one-to-many",
      target: "Comment",
      inverseSide: "post",
    },

    likes: {
      type: "one-to-many",
      target: "Like",
      inverseSide: "post",
    },
  },
});
