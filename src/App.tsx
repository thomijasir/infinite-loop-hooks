import React, { useState, useEffect, FC } from "react";

import { DEFAULT_LIST_DATA } from "./constant";
import ApiService from "./Api";
import InfiniteScroll from "./components/InfiniteScroll";
import { postMapperData } from "./Mapper";
import "./App.scss";

const { postService } = ApiService.getInstance();

// i know if there bunch of data the interface must be separate file but just because its a test i need hurry
interface DataPlaceholder {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface ResJsonPlaceholder {
  config: object;
  data: DataPlaceholder[];
  header: object;
  request: object;
  status: number;
  statusText: string;
}

// just for template if later need props just add here
interface IProps {}

const App: FC = (iProps: IProps) => {
  // State
  const [isLoadingApi, setIsLoadingApi] = useState(false);
  const [isLoadingItem, setIsLoadingItem] = useState<boolean>(false);
  const [infiniteItem, setInfiniteItem] = useState(DEFAULT_LIST_DATA);
  const [pages, setPages] = useState({
    perPage: 0,
    limit: 10,
  });

  useEffect(() => {
    setIsLoadingApi(true);
    postService
      .get("posts?_start=0&_limit=10")
      .then((res: ResJsonPlaceholder) => {
        setIsLoadingApi(false);
        setInfiniteItem(postMapperData(res.data));
      })
      .catch(() => {
        setIsLoadingApi(false);
        console.log("POP ERROR MESSAGE");
      });
  }, []);

  const updatePagination = () => {
    const count = (pages.perPage += 1);
    setPages({ ...pages, perPage: count });
  };

  const loadNewItem = () => {
    setIsLoadingItem(true);
    postService
      .get(`posts?_start=${pages.perPage + 1}&_limit=${pages.limit}`)
      .then((res: ResJsonPlaceholder) => {
        setIsLoadingItem(false);
        const responses = postMapperData(res.data);
        // construct state
        const items = [...infiniteItem, ...responses];
        // Update Pagination
        updatePagination();
        // Set Item that has construct
        setInfiniteItem(items);
      })
      .catch(() => {
        setIsLoadingItem(false);
        console.log("POP ERROR MESSAGE");
      });
  };
  // i just using any because its juts sample and i need hurry
  const handleScroll = (event: any) => {
    const height = event.target.scrollHeight;
    const offset = event.target.offsetHeight;
    const position = event.target.scrollTop;
    if (position + offset >= height) {
      loadNewItem();
    }
  };

  return (
    <div className="home-page">
      <div className="container-fluid">
        <div className="row center-xs">
          <div className="col-lg-4 make-relative">
            {/* i know the loader component must be split into small pieces but i need hurry so i put everything on the home */}
            <div className={`loader ${isLoadingApi ? "active" : ""}`}>
              <div className="lds-facebook">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <div className="section-title">
              <p>React Application Hooks</p>
            </div>
            {/* Just for sample Component Base & Passing Props in hooks*/}
            <InfiniteScroll
              handleScroll={handleScroll}
              infiniteItem={infiniteItem}
              isLoadingItem={isLoadingItem}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
