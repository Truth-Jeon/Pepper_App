import {getRequest} from 'apis/common';

export const paginationModule = async (
  endPoint,
  list,
  setList,
  page,
  setTotalPage,
  props = null,
  setTotalCount,
  setIsNew,
) => {
  try {
    const result = await getRequest(endPoint, {offset: page, ...props});

    const {limit} = props ?? {limit: 30};

    if (setIsNew && result.hasOwnProperty('is_news')) {
      setIsNew(result.is_news);
    }

    if (page === 0) {
      if (result.hasOwnProperty('count')) {
        if (setTotalPage) {
          setTotalPage(result.count / limit);
        }
      }
    }

    if (page === 0) {
      if (result.hasOwnProperty('count')) {
        if (setTotalCount !== undefined) {
          setTotalCount(result.count);
        }
      }
    }

    if (result.hasOwnProperty('total_pages')) {
      if (setTotalPage !== undefined) {
        setTotalPage(result.total_pages);
      }
    }

    if (page === 0) {
      if (result.results.hasOwnProperty('novels')) {
        setList(result.results.novels);
      } else {
        setList(result.results);
      }
      return result.results;
    } else {
      let mixItem;
      let prevItem = [...list];
      mixItem = prevItem.concat(result.results);
      setList(mixItem);
      return mixItem;
    }
  } catch (e) {
    console.log('pagination module get err', e);
    console.debug('pagination module get err', e);
    throw e;
  }
};

export const onReachEndModule = (
  page,
  setPage,
  totalPage,
  novels = null,
  limit = 30,
) => {
  if (novels) {
    if (novels.length > (page - 1) * limit) {
      if (page <= totalPage) {
        setPage(p => p + 1);
      }
    }
  } else {
    setPage(p => p + 1);
  }
};
