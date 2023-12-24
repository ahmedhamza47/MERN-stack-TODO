import axios from "axios";
import { useEffect, useState } from "react";

const CRUDNode = () => {
  const [data, setData] = useState<any>({
    firstName: "",
    lastName: "",
  });
  const [tableData, setTableData] = useState<any>([]);
  // useEffect(() => {
  //   fetch("http://localhost:3003/api/data")
  //     .then((res) => res.json())
  //     .then((data) => setData(data));
  // }, []);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // axios.post('http://localhost:3003/api/data', {)
    const reqData = {
      firstName: data.firstName,
      lastName: data.lastName,
    };
    try {
      await axios.post("http://localhost:3003/api/post", reqData);
      // setTableData(res.data);
      fetchedData();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchedData();
  }, []);
  const fetchedData = async () => {
    try {
      const res = await axios.get("http://localhost:3003/api/get");
      setTableData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(tableData, "tableData111111");
  return (
    <div>
      <h1>data</h1>
      {/* <ul>
            {data?.map((item: any) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul> */}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="firstName"
          onChange={(e) => setData({ ...data, firstName: e.target.value })}
        />{" "}
        <br /> <br />
        <input
          type="text"
          name="lastName"
          onChange={(e) =>
            setData({
              ...data,
              lastName: e.target.value,
            })
          }
        />{" "}
        <br /> <br />
        <button type="submit">Submit</button>
      </form>
      {/* {data?.message} */}
      {tableData &&
        tableData?.map((item: any) => (
          <div key={item.id}>
            <p>{item.firstName}</p>
            <p>{item.lastName}</p>
          </div>
        ))}
    </div>
  );
};

export default CRUDNode;
