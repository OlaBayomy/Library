let books = JSON.parse(localStorage.getItem("books")) || []
            
            //display books in the local storage
            displayBooks();

            function displayBooks() {
                for (let i = 0; i < books.length; i++) {

                    if (books[i].read) {
                        displayBook(books[i].title,books[i].author,books[i].pages,"rgb(38, 173, 38)","read")
                    }
                    else {
                        displayBook(books[i].title,books[i].author,books[i].pages,"rgb(247, 247, 29)","not read")
             
                    }
                }
            }


            //add a new book and display it
            function addBook() {
                if (document.getElementById('title').value != "" && document.getElementById('authorName').value != "") {

                    //make sure that the new book doesn't already exist

                    let foundSimilar = false
                    for (let i = 0; i < books.length; i++) {
                        if (books[i].title == document.getElementById('title').value && books[i].author == document.getElementById('authorName').value)
                            foundSimilar = true
                    }
                    if (foundSimilar)
                        document.getElementById("message").innerHTML = "This book already exists in your books list"
                    else {

                        document.getElementById("message").innerHTML = ""


                        //add the new book to the local storage

                        books.push({
                            title: document.getElementById("title").value,
                            author: document.getElementById("authorName").value,
                            pages: document.getElementById("pages").value,
                            read: document.getElementById("r").checked
                        })
                        localStorage.setItem("books", JSON.stringify(books))


                        // display the new book to the screen
                        if (document.getElementById("r").checked) {
                            displayBook(document.getElementById('title').value,document.getElementById('authorName').value,document.getElementById('pages').value,"rgb(38, 173, 38)","read")
                        }
                        else {
                            displayBook(document.getElementById('title').value,document.getElementById('authorName').value,document.getElementById('pages').value,"rgb(247, 247, 29)","not read")
                        }
                    }
                }
            }


            function displayBook(title,author,pages,color,read)
            {
                var newDiv = `<div class="book">
                  <p>${title}</p>
                  <p>${author}</p>
                  <p>${pages}</p>
                  <input type="button" style="background-color:${color};" onclick="readOrNot()" value="${read}"><br><br>
                  <input type="button" onclick="remove()" id="remove" value="remove">
              </div>`
              document.getElementById('booksList').insertAdjacentHTML('beforeend', newDiv);
            }


            // toggle the status of reading
            function readOrNot() {

                let x = event.target.parentElement.childNodes[1].innerHTML
                let y = event.target.parentElement.childNodes[3].innerHTML
                let index = findTargettedElement(x, y)

                if (event.target.style.backgroundColor == "rgb(38, 173, 38)") {
                    event.target.style.backgroundColor = "rgb(247, 247, 29)"
                    event.target.value = "not read"
                    books[index].read = false
                    localStorage.setItem("books", JSON.stringify(books));

                }
                else {
                    event.target.style.backgroundColor = "rgb(38, 173, 38)"
                    event.target.value = "read"
                    books[index].read = true
                    localStorage.setItem("books", JSON.stringify(books));
                }

            }

            // remove targetted book
            function remove() {
                event.target.parentElement.remove();
                let x = event.target.parentElement.childNodes[1].innerHTML
                let y = event.target.parentElement.childNodes[3].innerHTML
                let index = findTargettedElement(x, y)
                books.splice(index, 1)
                localStorage.setItem("books", JSON.stringify(books));
            }


            //find the index
            function findTargettedElement(x, y) {
                let i = 0
                for (let j = 0; j < books.length; j++) {
                    if (books[j].title == x && books[j].author == y)
                        i = j;
                }
                return i
            }
