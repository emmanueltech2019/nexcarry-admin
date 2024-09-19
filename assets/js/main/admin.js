axios.defaults.baseURL='https://api.nexcarry.com/api/v1/';
// axios.defaults.baseURL = "http://localhost:5001/api/v1/";


let token = localStorage.getItem("AdminToken");

function formatMoney(number) {
  // Convert the number to a string
  const numberString = number.toString();

  // Split the number into whole and decimal parts (if any)
  const parts = numberString.split(".");
  let wholePart = parts[0];
  const decimalPart = parts[1] || "";

  // Add commas to the whole part
  let formattedNumber = "";
  while (wholePart.length > 3) {
    formattedNumber = "," + wholePart.slice(-3) + formattedNumber;
    wholePart = wholePart.slice(0, wholePart.length - 3);
  }
  formattedNumber = wholePart + formattedNumber;

  // Combine the whole and decimal parts (if any)
  if (decimalPart) {
    formattedNumber += "." + decimalPart;
  }

  return formattedNumber;
}

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
const SignInForm = document.getElementById("SignInForm");

if (SignInForm) {
  SignInForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let email = SignInForm.email.value;
    let password = SignInForm.password.value;

    axios
      .post(`/admin/login`, { email, password })
      .then((res) => {
        localStorage.setItem("AdminToken", res.data.token);
        Toast.fire({
          icon: "success",
          title: `${res.data.message}`,
        }).then(() => {
          window.location.replace("../dashboard.html");
        });
        console.log(res);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
        console.log(err);
      });
  });
}


let shipments = document.getElementById("shipments")

if(shipments){
  axios({
    url: "/shipment",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      console.log(items)
      let htmlTemp = ``;
      document.getElementById("allShipment").innerHTML=items.length
      items.map((item) => {
        htmlTemp += ` <tr>
            <td>
              <div class="d-flex px-2 py-1">
                
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">${item.shipmentDetails.Email}</h6>
                  <p class="text-xs text-secondary mb-0">${item.trackingNumber}</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">${item.carrier}</p>
              <p class="text-xs text-secondary mb-0">${item.carrier}</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${
                item.status != "approved" ? "secondary" : "success"
              }">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.createdAt.split("T")[0]
              }</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.estimatedDelivery.split("T")[0]
              }</span>
            </td>
            <td class="align-middle text-center text-sm">
            <a href="shipment-details.html?id=${item._id}">
              <span class="badge badge-sm bg-gradient-success">View Details
              </span>
              </a>
            </td>
          </tr>`;
      });
      // console.log(htmlTemp, content)
      shipments.innerHTML = htmlTemp;
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
}





const depositsList = document.getElementById("depositsList");

if (depositsList) {
  axios({
    url: "/deposits",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">BTC</h6>
                  <p class="text-xs text-secondary mb-0">BITCOIN NETWORK</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
              <p class="text-xs text-secondary mb-0">Deposit</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${
                item.status != "approved" ? "secondary" : "success"
              }">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.date.split("T")[0]
              }</span>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-success" onclick='approveDeposit(${JSON.stringify(
                item._id
              )}, ${JSON.stringify(item.userId)})'>Approve Deposit
              </span>
            </td>
          </tr>`;
      });
      // console.log(htmlTemp, content)
      depositsList.innerHTML = htmlTemp;
      // console.log(res)
    })
    .catch((err) => {
      console.log(err);
    });
}

const withdrawList = document.getElementById("withdrawList");

if (withdrawList) {
  axios({
    url: "/withdrawals",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
            <td>
              <div class="d-flex px-2 py-1">
                <div>
                  <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
                </div>
                <div class="d-flex flex-column justify-content-center">
                  <h6 class="mb-0 text-sm">BTC</h6>
                  <p class="text-xs text-secondary mb-0">BITCOIN NETWORK</p>
                </div>
              </div>
            </td>
            <td>
              <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
              <p class="text-xs text-secondary mb-0">Withdrawal</p>
            </td>
            <td class="align-middle text-center text-sm">
              <span class="badge badge-sm bg-gradient-${
                item.status != "approved" ? "secondary" : "success"
              }">${item.status}
              </span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.date.split("T")[0]
              }</span>
            </td>
          </tr>`;
      });
      withdrawList.innerHTML = htmlTemp;
    })
    .catch((err) => {
      console.log(err);
    });
}

function approveDeposit(id, userId) {
  console.log(id, userId);
  axios({
    url: "/deposit/approve",
    method: "post",
    data: {
      userId,
      depositId: id,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
      Toast.fire({
        icon: "success",
        title: `${res.data.message}`,
      }).then(() => {
        window.location.reload();
      });
    })
    .catch((err) => {
      Toast.fire({
        icon: "error",
        title: `${err.response.data.message}`,
      });
      console.log(err);
    });
}


function approveEmail(userId) {
  Swal.fire({
    title: "Are you sure you want to approve?",
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Update",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: `/approve-user-email/${userId}`,
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: `Approved`,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          console.log(err);
        });
    }else {
      console.log("hmmmm")
    }
  });
  
}
// document.getElementById("ueb").addEventListener("click",(e)=>{

// })
function deleteUser(userId) {
  Swal.fire({
    title: "Are you sure you want to delete?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Delete",
  }).then((result) => {
    if (result.isConfirmed) {
      axios({
        url: `/delete-user/${userId}`,
        method: "delete",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: `Deleted`,
          }).then(() => {
            window.location.reload();
          });
        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: `${err.response.data.message}`,
          });
          console.log(err);
        });
    }
  });
}

const userList = document.getElementById("userList");

if (userList) {
  axios({
    url: "/users",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let items = res.data;
      console.log("items", items);
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += ` <tr>
            
            <td>
              <p class="text-xs font-weight-bold mb-0">${item.email}</p>
            </td>
            <td>
            <p class="text-xs font-weight-bold mb-0">${item.name}</p>
          </td>
          <td>
            <p class="text-xs font-weight-bold mb-0">${item.verified}</p>
          </td>
          
           
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.UserId
              }</span>
            </td>
            <td class="align-middle text-center">
              <span class="text-secondary text-xs font-weight-bold">${
                item.balance
              }</span>
            </td>
            <td class="align-middle text-center text-sm">
            <a href='../user.html?id=${item._id}'>
            <span class="badge badge-sm bg-gradient-success">View User
            </span>
            </a>
          </td>
           <td class="align-middle text-center">
              <button class="text-secondary text-xs font-weight-bold" onclick='deleteUser(${JSON.stringify(
                item._id
              )}, ${JSON.stringify(item.userId)})'>Delete User</button>
            </td>
          </tr>`;
      });
      userList.innerHTML = htmlTemp;
    })
    .catch((err) => {
      console.log(err);
    });
}

let updateForm = document.getElementById("updateForm");
if (updateForm) {
  axios({
    url: "/profile",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let data = res.data;
      updateForm.name.value = data.name;
      updateForm.email.value = data.email;
      updateForm.password.value = data.password;
    })
    .catch((err) => {
      console.log(err);
    });
  updateForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let name = updateForm.name.value;
    let email = updateForm.email.value;
    let password = updateForm.password.value;
    // document.getElementById("profit").innerHTML="$" + formatMoney(data.profit)
    //    alert("kk")
    axios({
      url: "/update",
      method: "post",
      data: { name, email, password },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        Toast.fire({
          icon: "success",
          title: `${res.data.message}`,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          title: `${err.response.data.message}`,
        });
        console.log(err);
      });
  });
}

let sumAll = document.getElementById("shipments");
if (sumAll) {
  axios({
    url: "/",
    method: "get",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      let { totalDeposit, totalWithdrawal, users, transactionHistory } =
        res.data;
      document.getElementById("allUser").innerHTML = users;
      document.getElementById("totalWithdrawal").innerHTML =
        "$" + formatMoney(totalWithdrawal);
      document.getElementById("totalDepost").innerHTML =
        "$" + formatMoney(totalDeposit);
      let items = transactionHistory;
      let htmlTemp = ``;
      items.map((item) => {
        htmlTemp += `<tr>
        <td>
          <div class="d-flex px-2 py-1">
            <div>
              <img src="../assets/img/bitcoin.png" class="avatar avatar-sm me-3" alt="user2">
            </div>
            <div class="d-flex flex-column justify-content-center">
              <h6 class="mb-0 text-sm capitalize">${item.transactionType}</h6>
            </div>
          </div>
        </td>
        <td>
          <p class="text-xs font-weight-bold mb-0">$${item.amount}</p>
        </td>
        <td class="align-middle text-center text-sm">
          <span class="badge badge-sm bg-gradient-${
            item.status != "approved" ? "secondary" : "success"
          }">${item.status}
          </span>
        </td>
        <td class="align-middle text-center">
          <span class="text-secondary text-xs font-weight-bold">${
            item.date.split("T")[0]
          }</span>
        </td>
      </tr>`;
      });
      const transactions = document.getElementById("transactions");

      transactions.innerHTML = htmlTemp;

      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let updateBalanceForm = document.getElementById("updateBalanceForm");



let infoB = document.getElementById("infoB");
function getDetails(params) {
  if (infoB) {
    // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get a specific parameter value
    const id = urlParams.get("id");
    if (id) {
      axios({
        url: `/shipment/getSingleShipmentById/${id}`,
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {
        let item = res.data
        let item2 = item.shipmentDetails
        infoB.innerHTML = `
       <table style='width:100%'>
                <tr>
                    <th>trackingNumber</th>
                    <td><input type="text" name="firstName" class='form-control' disabled value="${item.trackingNumber}" required></td>
                </tr>
                <tr>
                    <th>Carrier</th>
                    <td><input type="text" name="lastName" class='form-control' disabled value="${item.carrier}" required></td>
                </tr>
                <tr>
                    <th>Delivery Date</th>
                    <td><input type="text" name="lastName" class='form-control' disabled value="${item.estimatedDelivery.split("T")[0]}" required></td>
                </tr>
                <tr>
                    <th>Booking date Date</th>
                    <td><input type="text" name="lastName" class='form-control' disabled value="${item.createdAt.split("T")[0]}" required></td>
                </tr>
                <tr>
                    <th>Distance</th>
                    <td><input type="text" name="lastName" class='form-control' disabled value="${item2.distance}" required></td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td><input type="email" name="email" class='form-control' disabled value="${item2.Email}" required></td>
                </tr>
                <tr>
                    <th>Full Name:</th>
                    <td><input type="text" name="phone" class='form-control' disabled value="${item2.full_name}" required></td>
                </tr>
                <tr>
                    <th>Pick up Address:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.fromAddress}"></td>
                </tr>
                <tr>
                    <th>Pick up State:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.fromState}"></td>
                </tr>
                <tr>
                    <th>Pick up City:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.fromCity}"></td>
                </tr>
                <tr>
                    <th>Pick up Zip:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.fromZip}"></td>
                </tr>
                 <tr>
                    <th>Delivery Address:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.toAddress}"></td>
                </tr>
                <tr>
                    <th>Delivery State:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.toState}"></td>
                </tr>
                <tr>
                    <th>Delivery City:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.toCity}"></td>
                </tr>
                <tr>
                    <th>Delivery Zip:</th>
                    <td><input type="text" name="address" class='form-control' disabled value="${item2.toZip}"></td>
                </tr>

            </table>
            
            
            `;

            let htmlTemp1 = `<h6 class="mb-0 pt-5 bolder">Tracking log</h6>`
            item.shipmentLogs.map((itm,index)=>{
              console.log(itm, )
              htmlTemp1 +=`
              <div class='py-3 '>
              <span class='bold'>SET ${index + 1}</span>
                   <li class="list-group-item  shadow p-2">
							<strong>${itm.status}</strong><br/>
							<span class="badge bg-secondary">${itm.location}</span><br/>
              <span class="badge bg-secondary">${itm.timestamp.split("T")[0]} - ${itm.timestamp.split("T")[1].split(".")[0] }</span>
						  </li>
              </div>
  `
            })
            infoB.innerHTML+=htmlTemp1

      });
      let addLogForm = document.getElementById("addLogForm")
      if (addLogForm) {
        addLogForm.addEventListener("submit", (e)=>{
          e.preventDefault()
          let status = addLogForm.status.value
          let location= addLogForm.status.value

          axios({
            method:"post",
            data:{
              status,
              location
            },
            url:"/shipment/addShipmentLog/"+id
          })
          .then((res)=>{
            Toast.fire({
              icon: "success",
              title: `${res.data.message}`,
            }).then(() => {
              window.location.reload()
            });
          })
          .catch((err)=>{
            Toast.fire({
              icon: "error",
              title: 'error adding log try again',
            }).then(() => {
              // window.location.reload()
            });          
          })
        })
      }

    } else {
      window.location.replace("../dashboard.html");
    }
  }
}
getDetails()
