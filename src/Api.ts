import axios from "axios";

// its my custom API service
class ApiService {
  static INSTANCE: ApiService;
  static getInstance = () => {
    if (!ApiService.INSTANCE) ApiService.INSTANCE = new ApiService();
    return ApiService.INSTANCE;
  };

  movieService: any;
  peopleService: any;
  postService: any;

  constructor() {
    this.postService = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com",
    });

    this.postService.interceptors.response.use(
      (config: any) => config,
      this.errorHandle
    );
  }

  errorHandle = (error: any) =>
    // Disable Interceptors For Some Criteria, have custom error handle
    Promise.reject(error);
}

export default ApiService;
