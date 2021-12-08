export const movieMapperData = (data: any[]): any =>
  data.map((item: any) => ({
    id: item.id,
    title: item.title,
    desc: item.plot,
  }));

export const postMapperData = (data: any[]): any =>
  data.map((item: any) => ({
    id: item.id,
    title: item.title,
    desc: item.body,
  }));

export const peopleMapperData = (data: any[]): any =>
  data.map((item: any) => ({
    id: item._id,
    title: item.name,
    desc: item.about,
  }));
