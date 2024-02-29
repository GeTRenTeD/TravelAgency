import React, { useState, useEffect } from "react";
import CommonSection from "../shared/CommonSection";
import "../styles/tour.css";
import TourCard from "./../shared/TourCard";
import SearchBar from "./../shared/SearchBar";
import Newsletter from "./../shared/Newsletter";
import { Container, Row, Col } from "reactstrap";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import jsPDF from "jspdf";

const Tours = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [toursData, setToursData] = useState([]);

  const { data: tours, loading, error } = useFetch(`${BASE_URL}/tours?page=${page}`);
  const { data: tourCount } = useFetch(`${BASE_URL}/tours/search/getTourCount`);

  useEffect(() => {
    const pages = Math.ceil(tourCount / 8);
    setPageCount(pages);
    setToursData(tours); //данНые о турах в состояние
    window.scrollTo(0, 0);
  }, [page, tourCount, tours]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
  
    let y = 10;
    toursData.forEach((tour, index) => {
      if (index !== 0) {
      }

      doc.addImage(tour.photo, "JPEG", 10, y, 80, 60);
  
      doc.setFontSize(16);
      doc.text(`Tour ${index + 1}: ${tour.title}`, 100, y + 10);
  
      doc.setFontSize(12);
      doc.text(`City: ${tour.city}`, 100, y + 20);
  
      doc.text(`Price: $${tour.price} per person`, 100, y + 30);
  
      y += 80; //высота карточки плюс отступ
    });
  
    doc.save("tours_list.pdf");
  };
  

  return (
    <>
      <CommonSection title={"All Tours"} />
      <section>
        <Container>
          <Row>
            <SearchBar />
          </Row>
          <button
              className="pdfCreateButton"
              style={{
                background: "var(--secondary-color)",
                color: "white",
                cursor: "pointer",
                padding: "0.5rem 0.5rem",
                marginTop: "1rem",
                marginLeft: "1rem",
                borderRadius: "5px",
                border: "none",
              }}
              onClick={handleDownloadPDF} //оБработчик для скачивания PDF
            >
              All tours to PDF
            </button>
        </Container>
      </section>
      <section className="pt-0">
        <Container>
          {loading && <h4 className="text-center pt-5">Loading.....</h4>}
          {error && <h4 className="text-center pt-5">{error}</h4>}
          {!loading && !error && (
            <Row>
              {tours?.map((tour) => (
                <Col lg="3" md="6" sm="6" className="mb-4" key={tour._id}>
                  <TourCard tour={tour} />
                </Col>
              ))}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map((number) => (
                    <span
                      key={number}
                      onClick={() => setPage(number)}
                      className={page === number ? "active__page" : ""}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
      <Newsletter />
    </>
  );
};

export default Tours;

