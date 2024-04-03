import { useEffect, useState } from "react";
import BookModel from "../../models/BookModel";
import { SpinerLoading } from "../Utils/SpinerLoading";
import { StartReview } from "../Utils/StarsReviews";
import React from 'react';
import { ChekoutAndReviewBox } from "./ChekoutAndReviewBox";
import ReviewModel from "../../models/ReviewModel";
import userEvent from "@testing-library/user-event";
import { unstable_renderSubtreeIntoContainer } from "react-dom";
import { error } from "console";
import { LatestReviews } from "./LatestReviews";
import { useOktaAuth } from "@okta/okta-react";



export const BookCheckoutPage = () => {

  const { authState } = useOktaAuth();

  const [book, setBook] = useState<BookModel>();
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  // review state
  const [review, setReview] = useState<ReviewModel[]>([])
  const [totalStar, setTotalStar] = useState(0);
  const [isLoadingReview, setIsLoadingReview] = useState(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);



  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchBook = async () => {
      const baseUrl: string = `http://localhost:8080/api/books/${bookId}`;
     
      const response = await fetch(baseUrl);

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const responseJson = await response.json();
     
     

      const loadedBook: BookModel = {
        id: responseJson.id,
        title: responseJson.title,
        author: responseJson.author,
        description: responseJson.description,
        copies: responseJson.copies,
        copiesAvailable: responseJson.copiesAvailable,
        category: responseJson.category,
        img: responseJson.img,
      };

      setBook(loadedBook);
      setIsLoading(false);
    };
    fetchBook().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
  }, []);

  useEffect(() => {
    const fetchBookReviews = async () =>{
      const reviewUrl: string = `http://localhost:8080/api/reviews/search/findByBookId?bookId=${bookId}`;
      const responseReviews = await fetch(reviewUrl);

      if(!responseReviews.ok){
        throw new Error("Somthing wrong..!");
      }

      const responseJsonReviews =  await responseReviews.json();
      const responseData = responseJsonReviews._embedded.reviews;

      const loadedReviews: ReviewModel[] = [];

      let weightedStarReviews: number = 0;

      for(const key in responseData){
        loadedReviews.push({
          id: responseData[key].id,
          userEmail: responseData[key].userEmail,
          date: responseData[key].date,
          rating: responseData[key].rating,
          book_id: responseData[key].booId,
          reviewDescription: responseData[key].reviewDescription,

        });

        weightedStarReviews = weightedStarReviews + responseData[key].rating;
      }

      if (loadedReviews) {
        const round  = (Math.round(weightedStarReviews/loadedReviews.length) * 2/2).toFixed(1);
        setTotalStar(Number(round));
      }

      setReview(loadedReviews);
      setIsLoadingReview(false);
    };

    fetchBookReviews().catch((error: any)=>{
      setIsLoadingReview(false);
      setHttpError(error.message);

    })
  })

  

  if (isLoading || isLoadingReview) {
    return <SpinerLoading />;
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }
  return (
    <div>
      <div className="container d-none d-lg-block">
        <div className="row mt-5">
          <div className="col-sm-2 col-md-2">
            {book?.img ? (
              <img src={book?.img} width="226" height="349" alt="Book"></img>
            ) : (
              <img
                src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
                width="226"
                height="349"
                alt="Book"
              ></img>
            )}
          </div>
          <div className="col-4 col-md-4 container">
            <div className="ml-2">
              <h2>{book?.title}</h2>
              <h5 className="text-primary">{book?.author}</h5>
              <p className="lead">{book?.description}</p>
              <StartReview rating={totalStar} size={32}/>
            </div>
          </div>
          <ChekoutAndReviewBox book={book} mobile={false}/>
        </div>
        <hr/>
        <LatestReviews reviews={review} bookId={book?.id} mobile={true}/>
      </div>
      <div className="container d-lg-none mt-5">
        <div className="d-flex justify-content-center align-items-center">
          {book?.img ? (
            <img src={book?.img} width="226" height="349" alt="Book"></img>
          ) : (
            <img
              src={require("./../../Images/BooksImages/book-luv2code-1000.png")}
              width="226"
              height="349"
              alt="Book"
            ></img>
          )}
        </div>
        <div className='mt-4'>
            <div className='ml-2'>
               <h2>{book?.title}</h2>
               <h5 className='text-primary'>{book?.author}</h5>
               <p className='lead'>{book?.description}</p>
               <StartReview rating={totalStar} size={32}/>
            </div>
        </div>
        <ChekoutAndReviewBox book={book} mobile={true}/>
        <hr/>
        <LatestReviews reviews={review} bookId={book?.id} mobile={true}/>
      </div>
    </div>
  );
};
