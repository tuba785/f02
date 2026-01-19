import { useEffect, useState } from "react";
import { Table } from "antd";
import { getUsers } from "../api/usersApi";
import type { User } from "../types/User";

const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "City",
      dataIndex: ["address", "city"],
      key: "city",
    },
  ];

  return (
    <Table
      rowKey="id"
      columns={columns}
      dataSource={users}
      loading={loading}
    />
  );
};

export default UsersTable;
