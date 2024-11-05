function Validation(values){

    let error ={}
    const email_pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phone_pattern= /^\d{10}$/
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{6,}$/

    if (values.email ==="") {
        error.email ="Email không được rỗng"
    } 
    else if(!email_pattern.test(values.email)) {
        error.email ="Email không chính xác"
    }
    else{
        error.email =""
    }

    if (values.phone ==="") {
        error.phone ="Phone không được rỗng"
    } 
    else if(!phone_pattern.test(values.phone)) {
        error.phone ="Phone không chính xác"
    }
    else{
        error.phone =""
    }

   
    if (values.password ==="") {
        error.password ="Password không được rỗng"
    } 
    else if(!password_pattern.test(values.password)) {
        error.password ="Password  gồm 1 chữ cái thường 1 chữ cái in hoa 1 chữ số và có 6 ký tự"
    }
    else{
        error.password =""
    }
    return error;
}

export default Validation;