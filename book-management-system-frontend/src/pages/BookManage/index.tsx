import { useEffect, useState } from "react";
import { Button, Card, Flex, Form, Input, message, Popconfirm } from "antd";
import { deleteBook, list } from "../../api";
import "./index.css";
import { CreateBookModal } from "./CreateBookModal";
import { UpdateBookModal } from "./UpdateBookModal";

interface Book {
  id: number;
  name: string;
  author: string;
  description: string;
  cover: string;
}

export function BookManage() {
  const [bookList, setBookList] = useState<Array<Book>>([]);
  const [name, setName] = useState("");
  const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false);

  const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(0);
  const [num, setNum] = useState(0);

  async function fetchData() {
    try {
      const data = await list(name);
      if (data.status === 201 || data.status === 200) {
        setBookList(data.data);
      }
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }
  async function searchBook(values: { name: string }) {
    setName(values.name);
  }
  useEffect(() => {
    fetchData();
  }, [name, num]);

  async function handleDelete(id: number) {
    try {
      await deleteBook(id);
      message.success("删除成功");
      setNum(Math.random());
    } catch (e: any) {
      message.error(e.response.data.message);
    }
  }

  return (
    <div className="book-manage">
      {/* 创建 */}
      <CreateBookModal
        isOpen={isCreateBookModalOpen}
        handleClose={() => {
          setCreateBookModalOpen(false);
          setNum(Math.random());
        }}
      ></CreateBookModal>
      {/* 更新 */}
      <UpdateBookModal
        id={updateId}
        isOpen={isUpdateBookModalOpen}
        handleClose={() => {
          setUpdateBookModalOpen(false);
          setNum(Math.random());
        }}
      ></UpdateBookModal>
      <h1>图书管理demo</h1>
      <div className="content">
        <div className="book-search">
          <Form
            name="search"
            layout="inline"
            colon={false}
            onFinish={searchBook}
          >
            <Form.Item label="图书名称" name="name">
              <Input />
            </Form.Item>
            <Form.Item label=" ">
              <Flex gap="small" wrap>
                <Button type="primary" htmlType="submit">
                  搜索图书
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ background: "green" }}
                  onClick={() => setCreateBookModalOpen(true)}
                >
                  添加图书
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </div>
        <div className="book-list">
          {bookList.map((book) => {
            return (
              <Card
                key={book.id}
                className="card"
                hoverable
                style={{ width: 300 }}
                cover={
                  <img
                    alt="example"
                    src={`http://localhost:3000/${book.cover}`}
                  />
                }
              >
                <h2>{book.name}</h2>
                <div>{book.author}</div>
                <div className="links">
                  <a
                    href="#"
                    onClick={() => {
                      setUpdateId(book.id);
                      setUpdateBookModalOpen(true);
                    }}
                  >
                    编辑
                  </a>
                  <Popconfirm
                    title="图书删除"
                    description="确认删除吗？"
                    onConfirm={() => handleDelete(book.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">删除</a>
                  </Popconfirm>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
