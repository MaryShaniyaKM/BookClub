import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import AddBook from './components/AddBook'
import Auth from './components/Auth'
import BookDetail from './components/BookDetail'
import Books from './components/Books'
import Header from './components/Header'
import Search from './components/Search'
import ShowBook from './components/ShowBook'
import UserBooks from './components/UserBooks'

const App = () => {
  
  return (
    <div>
      
      <header>
        <Header/>
      </header>
      <main>
        <Routes>
        <Route path="/" element={<Books/>}/>
          <Route path="/auth" element={<Auth />} />
          <Route path="/books" element={<Books />} />
          <Route path="/myBooks" element={<UserBooks />} />
          <Route path="/myBooks/:id" element={<BookDetail />} />
          <Route path="/books/add" element={<AddBook />} />
          <Route path="/books/search" element={<Search/>}/>
          <Route path="/books/:id" element={<ShowBook/>}/>
        </Routes>
      </main>
      
    </div>
  )
}

export default App