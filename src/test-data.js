const sleep = (msec) => new Promise((resolve) => setTimeout(resolve, msec));

const generateDataList = (dataCount) => {
  return [...Array(dataCount).keys()].map((index) => {
    const id = index + 1;

    return { id, name: `Test${id}`, isAdmin: id % 2 === 0 };
  });
};

export const getTestData = async (option) => {
  const { limit, offset, dataCount } = option;
  await sleep(1000);

  const rangeMin = offset;
  const rangeMax = Number(offset) + Number(limit);
  const userCount = dataCount;
  const userList = generateDataList(Number(dataCount)).filter((data) => {
    return rangeMin < data.id && rangeMax >= data.id;
  });

  return { userList, userCount };
};
