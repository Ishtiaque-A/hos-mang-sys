import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export default function AssignedPointsPlan() {
  const columns = [
    {
      title: "Name",
      field: "title",
      render: (row) => <div>{row?.plan?.title}</div>,
      // cellStyle: {
      //     textAlign: 'center',
      // },
    },
    {
      title: "Assigned Doctor",
      field: "",
      render: (row) => {
        return <div>{row?.doctor?.fullName}</div>;
      },
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "Shared Point %",
      field: "",
      render: (row) => {
        const point = row?.plan?.shares?.find(
          (item) => Number(item?.plan_master_id) === Number(row?.plan_master_id)
        );

        return <>{point?.share_percentage}</>;
      },
      cellStyle: {
        textAlign: "center !important",
      },
    },
    {
      title: "Status",
      field: "",
      render: (row) =>
        Number(row.status) === 1 ? <div>Active</div> : <div>Inactive</div>,
      cellStyle: {
        textAlign: "center",
      },
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    axios
      .get("assigned-points-plan")
      .then((res) => {
        setData(res.data.plan || []);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  // const handleDisable = (id) => {
  //     Swal.fire({
  //         title: 'Are you sure?',
  //         text: "You won't be able to revert this!",
  //         icon: 'warning',
  //         showCancelButton: true,
  //         confirmButtonColor: '#3085d6',
  //         cancelButtonColor: '#d33',
  //         confirmButtonText: 'Yes, Disable it!',
  //     }).then((result) => {
  //         if (result.isConfirmed) {
  //             axios
  //                 .post(`doctors-point-plan-disable/${id}`)
  //                 .then((res) => {
  //                     if (res.data.status === 200) {
  //                         setData(data.filter((item) => item.id !== id))
  //                     }
  //                     Swal.fire('Success!', res.data.message, 'success')
  //                 })
  //                 .catch((err) => {
  //                     console.log(err)
  //                 })
  //         }
  //     })

  // }

  return (
    <div>
      <div className="shadow-sm p-2 mb-3 bg-body lab-points-plan rounded mt-1">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h6 className="mt-1 mx-2">Points Plan</h6>
          <Link
            className="text-decoration-none"
            to="/lab-module-new/add-points-plan"
          >
            <button
              style={{
                backgroundColor: "#69B128",
                color: "white",
                fontWeight: "medium",
                border: "none",
                borderRadius: "7px",
                padding: "5px 15px",
              }}
              //   onClick={() => setModalIsOpenForAdd(true)}
            >
              Add
            </button>
          </Link>
        </div>
        <hr />
        <div className="row">
          <div className="col-md-12">
            <MaterialTable
              columns={columns}
              data={data}
              isLoading={loading}
              options={{
                search: false,
                showTitle: false,
                searchFieldAlignment: "left",
                pageSize: 10,
                emptyRowsWhenPaging: false,
                pageSizeOptions: [10, 20, 50, 100],
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
