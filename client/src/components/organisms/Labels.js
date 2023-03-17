import React from "react";
import Label from "../molecules/Label";
import { default as api } from "../../store/apiSlice";

import { getLabels } from "../../helper/helper";

const Labels = () => {
  const { data, isFetching, isSuccess, isError } = api.useGetLabelsQuery();
  let Transactions;
  getLabels(data);

  if (isFetching) {
    Transactions = <div>Fetching</div>;
  } else if (isSuccess) {
    Transactions = getLabels(data, "type").map((v, i) => (
      <Label key={i} data={v}></Label>
    ));
  } else if (isError) {
    Transactions = <div> Error</div>;
  }
  return <>{Transactions}</>;
};

export default Labels;
