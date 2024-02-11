import React from "react";
import ReviewModel from "../../models/ReviewModel"

export const Review: React.FC<{review: ReviewModel}> = (props) =>{

    const date = new Date(props.review.date);

    const longMonth = date.toLocaleString('en-us', {month: 'long'});
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ' ' + dateYear; 
    
    return(

        <div>
            
        </div>

    );

}