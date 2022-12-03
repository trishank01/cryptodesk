import React from "react";
import { Pagination } from "antd";

const PaginationPage = ({offset , setOffset}) => <Pagination defaultCurrent={1} total={offset} onChange={(e) => setOffset(offset + 50)} />;

export default PaginationPage;
