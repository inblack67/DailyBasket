`
mutation{
    register(name:"Aman", email:"aman@gmail.com", password:"12345678"){
      name
    }
  }

  mutation{
    login(email:"aman@gmail.com", password:"12345678"){
      name
    }
  }

  mutation{
    addCategory(title:"Grocery", description:"lorem"){
      title
    }
  }
`