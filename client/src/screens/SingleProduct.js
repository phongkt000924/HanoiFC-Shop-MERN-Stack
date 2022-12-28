import React, { useEffect, useState } from "react";
import Header from "./../components/Header";
import Rating from "../components/homeComponents/Rating";
import { Link } from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductReview,
  listProductDetails,
} from "../Redux/Actions/ProductActions";
import Loading from "../components/LoadingError/Loading";
import { PRODUCT_CREATE_REVIEW_RESET } from "../Redux/Constants/ProductConstants";
import moment from "moment";

const SingleProduct = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const {
    loading: loadingCreateReview,
    error: errorCreateReview,
    success: successCreateReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successCreateReview) {
      alert("Bạn đã đánh giá sản phẩm!");
      setRating(0);
      setComment("");
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(productId));
  }, [dispatch, productId, successCreateReview]);

  const AddToCartHandle = (e) => {
    e.preventDefault();
    history.push(`/cart/${productId}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createProductReview(productId, {
        rating,
        comment,
      })
    );
  };

  return (
    <>
      <Header />

      <div className="container single-product">
        {loading ? (
          <Loading />
        ) : error ? (
          <Message variant="alert-danger">{error}</Message>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6">
                <div className="single-image">
                  <img src={product.image} alt={product.name} />
                </div>
              </div>

              <div className="col-md-6">
                <div className="product-dtl">
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                  </div>

                  <p>{product.description}</p>

                  <div className="product-count col-lg-7 ">
                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Giá</h6>
                      <span>${product.price}</span>
                    </div>

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Trạng thái</h6>
                      {product.countInStock > 0 ? (
                        <span>Còn hàng</span>
                      ) : (
                        <span>Hết hàng</span>
                      )}
                    </div>

                    <div className="flex-box d-flex justify-content-between align-items-center">
                      <h6>Đánh giá</h6>

                      <Rating
                        value={product.rating}
                        text={`${product.numReviews} đáng giá`}
                      />
                    </div>

                    {product.countInStock > 0 ? (
                      <>
                        <div className="flex-box d-flex justify-content-between align-items-center">
                          <h6>Số lượng</h6>

                          <select
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <button
                          onClick={AddToCartHandle}
                          className="round-black-btn"
                        >
                          Thêm vào giỏ hàng
                        </button>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {/* RATING */}
            <div className="row my-5">
              <div className="col-md-6">
                <h6 className="mb-3">ĐÁNH GIÁ</h6>

                {product.reviews.length === 0 && (
                  <Message variant={"alert-info mt-3"}>
                    Chưa có đánh giá nào cả [✖‿✖]
                  </Message>
                )}

                {product.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="mb-5 mb-md-3 p-3 shadow-sm rounded"
                    style={{
                      backgroundColor: "#ebf0fd",
                    }}
                  >
                    <strong>{review.name}</strong>

                    <Rating value={review.rating} />

                    <span>{moment(review.createdAt).calendar()}</span>

                    <div className="alert alert-info mt-3">
                      {review.comment}
                    </div>
                  </div>
                ))}
              </div>

              <div className="col-md-6">
                <h6>TIẾN HÀNH ĐÁNH GIÁ</h6>

                <div className="my-4">
                  {loadingCreateReview && <Loading />}

                  {errorCreateReview && (
                    <Message variant="alert-danger">
                      {errorCreateReview}
                    </Message>
                  )}
                </div>

                {userInfo ? (
                  <form onSubmit={submitHandler}>
                    <div className="my-4">
                      <strong>Đánh giá sản phẩm</strong>

                      <select
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="col-12 p-3 mt-2 border-0 rounded"
                        style={{
                          backgroundColor: "#ebf0fd",
                        }}
                      >
                        <option value="">Chọn...</option>
                        <option value="1">1 - Tệ</option>
                        <option value="2">2 - Tạm được</option>
                        <option value="3">3 - Tốt</option>
                        <option value="4">4 - Rất tốt</option>
                        <option value="5">5 - Tuyệt vời</option>
                      </select>
                    </div>

                    <div className="my-4">
                      <strong>Bình luận sản phẩm</strong>

                      <textarea
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="col-12 p-3 mt-2 border-0 rounded"
                        style={{
                          backgroundColor: "#ebf0fd",
                        }}
                      ></textarea>
                    </div>

                    <div className="my-3">
                      <button
                        disabled={loadingCreateReview}
                        className="col-12 border-0 p-3 rounded text-white"
                        style={{
                          backgroundColor: "#411e8c",
                        }}
                      >
                        ĐÁNH GIÁ
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="my-3">
                    <Message variant={"alert-warning"}>
                      Vui lòng{" "}
                      <Link to="/login">
                        " <strong>Đăng nhập</strong> "
                      </Link>{" "}
                      để tiến hành đánh giá sản phẩm{" "}
                    </Message>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default SingleProduct;
