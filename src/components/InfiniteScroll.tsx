import React from "react";
import "./InfiniteScroll.scss";

interface InfiniteLoopItem {
  id: number;
  title: string;
  desc: string;
}

interface IProps {
  handleScroll: any;
  infiniteItem: InfiniteLoopItem[];
  isLoadingItem: boolean;
}

const InfiniteScroll = (props: IProps) => {
  const { infiniteItem, handleScroll, isLoadingItem } = props;
  return (
    <div className="infinite-loop" onScroll={handleScroll}>
      {/* i know this component can be split to list view but i need hurry, i didn't do that right now */}
      {infiniteItem.map((data: InfiniteLoopItem, index: number) => (
        <div className="item" key={`${data.id}-${index}`}>
          <div className="title">
            <p>{data.title}</p>
          </div>
          <div className="description">
            <p>{data.desc}</p>
          </div>
        </div>
      ))}
      {/* i know the loader component must be split into small pieces but i need hurry */}
      <div className="loader-wrapper">
        <div className={`lds-ripple ${isLoadingItem ? "active" : "active"}`}>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default InfiniteScroll;
