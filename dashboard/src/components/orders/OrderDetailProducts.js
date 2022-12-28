import React from "react";
import { Link } from "react-router-dom";

const OrderDetailProducts = (props) => {
  const { order, loading } = props;

  if (!loading) {
    // Calculate Price
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  return (
    <table className="table border table-lg">
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Sản phẩm</th>
          <th style={{ width: "20%" }}>Đơn giá</th>
          <th style={{ width: "20%" }}>Số lượng</th>
          <th style={{ width: "20%" }} className="text-end">
            Tổng cộng
          </th>
        </tr>
      </thead>

      <tbody>
        {order.orderItems.map((item, index) => (
          <tr key={index}>
            <td>
              <Link className="itemside" to="#">
                <div className="left">
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{ width: "40px", height: "40px" }}
                    className="img-xs"
                  />
                </div>
                <div className="info">{item.name}</div>
              </Link>
            </td>

            <td>${item.price} </td>

            <td>{item.qty} </td>

            <td className="text-end"> ${item.qty * item.price}</td>
          </tr>
        ))}

        <tr>
          <td colSpan="4">
            <article className="float-end">
              <dl className="dlist">
                <dt>Tổng cộng:</dt> <dd>${order.itemsPrice}</dd>
              </dl>

              <dl className="dlist">
                <dt>Phí giao hàng:</dt> <dd>${order.shippingPrice}</dd>
              </dl>

              <dl className="dlist">
                <dt>Tổng tiền cần trả:</dt>

                <dd>
                  <b className="h5">${order.totalPrice}</b>
                </dd>
              </dl>

              <dl className="dlist">
                <dt className="text-muted">Trạng thái:</dt>

                <dd>
                  {order.isPaid ? (
                    <span className="badge rounded-pill alert alert-success text-success">
                      Đã thanh toán
                    </span>
                  ) : (
                    <span className="badge rounded-pill alert alert-danger text-danger">
                      Chưa thanh toán
                    </span>
                  )}
                </dd>
              </dl>
            </article>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default OrderDetailProducts;
