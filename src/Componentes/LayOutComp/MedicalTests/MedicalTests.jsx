import React, { useEffect, useState } from "react";
import style from "./MedicalTests.module.scss";
import axios from "axios";

export default function MedicalTests() {
  const [test, setTest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredTests, setFilteredTests] = useState([]);

  const getTest = async function () {
    let { data } = await axios.get(
      "https://pharmacy-tests845.vercel.app/tests/getAllTests"
    );
    console.log(data.tests);
    setTest(data.tests);
    setFilteredTests(data.tests);
    setLoading(false); 
  };

  useEffect(() => {
    getTest();
  }, []);

  const handleSearch = () => {
    const filteredResults = test.filter(
      (item) =>
        (item.classOfTest &&
          item.classOfTest.toLowerCase().includes(searchInput.toLowerCase())) ||
        (item.title &&
          item.title.toLowerCase().includes(searchInput.toLowerCase()))
    );

    setFilteredTests(filteredResults);
  };

  return (
    <>
      <div className={`${style.all}   `}>
      <div className={` ${style.line} w-100  `}></div>
        <div className="container pt-4">
          <div className="row ">
            <div className="col-md-12 text-center py-2 ">
              <h2 className="text-center">Medical Tests Collection</h2>
              <div className={` ${style.line} w-50  m-auto`}></div>
            </div>
            <div className="col-md-9 m-auto pt-3">
              <form className="form input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by classification or title.."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleSearch}
                >
                  Search
                </button>
              </form>
            </div>
          </div>
          <div className="row  mt-5 pb-5   g-5 ">
            {loading ? (
              <div className=" d-flex w-100 h-100  my-5 py-5 justify-content-center align-items-center">
              <span className={`${style.loader} fa-10x my-5  `}></span>
              </div>
            
            ) : (
              filteredTests.map((item, index) => (
                <div
                  key={index}
                  className={`  col-md-4 col-sm-6  text-center`}
                >
                  <div className={`${style.card} m-auto`}>
                    <div className={`${style.carddetails}`}>
                      <p className={`${style.texttitle}`}>{item.title}</p>
                      <p className={`${style.textbody}`}>
                        {item.desc.split(" ").slice(0, 8).join(" ")}
                      </p>
                      <h6 className={`${style.textbody} text-dark `}>
                        <span className="t text-danger">Classification: </span>
                        {item.classOfTest}
                      </h6>
                    </div>
                    <button
                      className={`${style.cardbutton}`}
                      data-bs-toggle="modal"
                      data-bs-target={`#addArtical${index}`}
                    >
                      More info
                    </button>
                  </div>

                  <div
                    className="modal fade mt-5"
                    id={`addArtical${index}`}
                    tabIndex={-1}
                    aria-labelledby={`exampleModalLabel${index}`}
                    aria-hidden="true"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <form>
                          <div className="modal-header">
                            <h1
                              className="modal-title fs-5"
                              id={`exampleModalLabel${index}`}
                            >
                              {item.title}
                            </h1>
                            <button
                              type="button"
                              className="btn-close"
                              data-bs-dismiss="modal"
                              aria-label="Close"
                            />
                          </div>
                          <div className="modal-body">
                            <p>{item.desc}</p>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-danger"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
