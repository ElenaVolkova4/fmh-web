import React, { useContext } from "react";
import FilterIcon from "src/assets/icons/filter.svg";
import AddIcon from "src/assets/icons/add.svg";
import SortIcon from "src/assets/icons/sort.svg";
import { useGetNewsQuery } from "src/services/api/newsApi";
import Modal, { ModalContext } from "src/components/modal/Modal";
import AddNews from "src/pages/news/components/addNews/AddNews";
import NewsNode from "src/pages/news/components/newsNode/NewsNode";
import PaginateComponent from "src/components/paginateComponent/PaginateComponent";
import styles from "./News.module.less";

const AddIconComp = () => {
  const changeVisible = useContext(ModalContext);
  return <AddIcon onClick={changeVisible} />;
};

const NewsPage = (): any => (
  <div className={styles.news_root}>
    <header className={styles.header_news}>
      <div className={styles.header_title}>Новости</div>
      <div className={styles.header_icons}>
        <Modal modal={<AddNews />}>
          <AddIconComp />
        </Modal>
        <FilterIcon />
        <SortIcon />
      </div>
    </header>
    <PaginateComponent useQuery={useGetNewsQuery} CardNode={NewsNode} />
  </div>
);

export default NewsPage;
