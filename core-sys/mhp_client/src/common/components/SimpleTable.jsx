export const SimpleTable = ({ columns = [], data = [], isSerially = true }) => {
  return (
    <div
      style={{
        maxHeight: "600px",
        overflow: "auto",
        borderRadius: "10px",
        border: "1px solid #d1cbcb",
        paddingBottom: "0px",
      }}
      className="table-responsive"
    >
      <table
        className="table table-striped"
        style={{
          // border: "none",
          borderColor: "#d1cbcb",
        }}
      >
        <thead
          style={{
            borderBottomColor: "#d1cbcb",
          }}
        >
          <tr>
            {isSerially && <th scope="col">#</th>}
            {columns.map((item, index) => (
              <th scope="col" style={item.style ? item.style : {}} key={index}>
                {item?.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index}>
              {isSerially && <td scope="row">{index + 1}</td>}
              {columns.map((column, i) => (
                <td style={column.style ? column.style : {}} key={i}>
                  {column.render ? column.render(item) : item[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
