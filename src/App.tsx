import React from "react";
import "./App.css";
import { Navebar } from "./layouts/NavbarAndFooter/Navebar";
import { Footer } from "./layouts/NavbarAndFooter/Footer";
import { HomePage } from "./layouts/HomePage";
import { SearchBooksPage } from "./layouts/SearchBooks/SearchBooksPage";
import { Redirect, Route, Switch } from "react-router-dom";
import { BookCheckoutPage } from "./layouts/BookChekoutPage/BookChekoutPage";

export const  App = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
    <Navebar/>
     <div className="flex-grow-1">
    <Switch>
    <Route path='/' exact>
      <Redirect to='/home' />
    <HomePage/>
    </Route>
    <Route path='/home'>
      <HomePage/>
    </Route>
    <Route path='/search'>
    <SearchBooksPage/>
    </Route>
    <Route path='/checkout/:bookId'>
      <BookCheckoutPage/>
    </Route>
    </Switch>
    </div>
    <Footer/>
    </div>

  );
}

export default App;
