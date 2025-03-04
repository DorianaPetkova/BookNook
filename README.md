<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <header>
      <h1>BookNook</h1>
    </header>
    <section>
      <h2>Overview:</h2>
      <p></p>
      <p>
        The idea came because of our grannies. They want to read, but don't have
        time or opportunity to go to the library.
      </p>
      <p>
        We wanted to give them an easy way to access their favourite pieces of
        literature.
      </p>
    </section>
    <section>
      <h2>Features:</h2>
      <ul>
        <li>View different books</li>
        <li>Create and log in with an individual account</li>
        <li>User friendly interface</li>
        <ul>
          <li>Toggle font size</li>
          <li>Change fonts</li>
          <li>Switch between light and dark themes</li>
        </ul>
        <li>CRUD for both users and books</li>
        <ul>
          <li>Add books/users</li>
          <li>Edit books/users</li>
          <li>Delete books/users</li>
          <li>Hashing for passwords</li>
        </ul>
      </ul>
    </section>
    <section>
      <h2>How to run the project:</h2>
      <ol>
        <p>Requirements for running the project : Node.js</p>
        <li>Clone the project to your local machine</li>
        <li>Open the project using your desired environment</li>
        <li>
          Write in the console: npm install (that installs all the needed
          dependencies)
        </li>
        <li>After the installation is complete write: npm run dev</li>
        <li>Open in desired browser and enjoy!</li>
      </ol>
    </section>
    <section>
      <h2>Technology:</h2>
      <ul>
        <li>Frontend:</li>
        <ul>
          <li>React</li>
          <li>Css</li>
          <li>Next.js</li>
        </ul>
        <li>API Integration - MongoDB</li>
        <li>Environment -VS Code</li>
        <li>Design - Figma</li>
        <li>Dependencies:</li>
        <ul>
          <li>css: Version 3.0.0</li>
          <li>next: Version 15.1.6</li>
          <li>mongoose: Version 8.10.1</li>
          <li>epubjs: Version 0.3.93</li>
          <li>bcryptjs: Version 3.0.1</li>
        </ul>
      </ul>
    </section>
    <section>
      <h2>Usage:</h2>
       <p>
        The site has both dark and light theme for better user experience.
      </p>
      <img src="presenting/white home.png" alt="HomePage" />
       <img src="presenting/black home.png" alt="HomePage" />
      <p>
        Create an account, after creating it, the app redirects you to the Log
        In page.
      </p>
      <img src="presenting/login.png" alt="Login" />
      <img src="presenting/register.png" alt="Register" />
      <p>
        After you log in you will be able to access the books. A user without an
        account cannot view them.
      </p>
      <img src="presenting/dashboard.png" alt="Dashboard" />
      <p>
        You can choose the font you'd like to read it with.
      </p>
      <img src="presenting/font.png" alt="Font" />
       <p>
        You can adjust the font size for better viewing.
      </p>
       <img src="presenting/dark toggle.png" alt="Font" />
      <p>
        Only the master admin is able to see the 'Crud' tab and has access to
        it.
      </p>
      <img src="presenting/database.png" alt="crud" />
      <p>
        In the crud page, the admin can edit, delete, add and view the details
        of the users and the books.
      </p>
      <img src="presenting/add book.png" alt="post" />
      <img src="presenting/book details.png" alt="get" />
      <p>
        When adding or changing the user the password is hidden to keep
        confidentiality.
      </p>
      <img src="presenting/edit user.png" alt="put" />
      <p>
       When deleting from the database a confirmation pops up to prevent accidents.
      </p>
      <img src="presenting/delete user.png" alt="delete" />
    </section>
    <footer>
      <p>The project was created by the one and only: “Slayers”</p>
      <p>
        Frontend: Irina Semenyakina -
        <a href="mailto:kittifeya@gmail.com">kittifeya@gmail.com</a>
      </p>
      <p>
        Backend: Doriana Petkova –
        <a href="mailto:doriana.petkova@gmail.com">doriana.petkova@gmail.com</a>
      </p>
      <img
        src="https://media.discordapp.net/attachments/1216345796388327496/1342503700975063120/7b0b9cbd4bc362f222ded4b126594332.png?ex=67ba8840&is=67b936c0&hm=fe1aa84c5e61c51653b85c03489b0bf1681588aced9c86039a99bbb5a2f9aa5b&=&format=webp&quality=lossless&width=600&height=600"
        alt="Group Photo"
      />
    </footer>
  </body>
</html>
