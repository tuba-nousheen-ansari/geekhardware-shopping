var confirmPassword;

            function validateRegistor(){
                var name=validateName();
                var email=validateEmail();
                var pass=validatePassword();
                var mobile=validateMobiile();
                var address=validateAddress();
                var gender=validateGender();
                var reenterPass=validateReEnterPassword();
                var age=validateAge();

                if(pass&&name && email&&mobile&&address&&gender&&reenterPass&&age)
                    return true;
                return false;
            }
            
            function validateAge(){
                var status= true;
                var age =parseInt(document.getElementById("age").value);
                var ageErr= document.getElementById("ageErr");

                if(!age)
                {
                    status=false;
                    ageErr.innerHTML="Please enter age";
                    ageErr.style.color="red";
                }
                else if((age<21))
                {
                    status=false;
                    ageErr.innerHTML="Your are not allowed for this exam you are to young..";
                    ageErr.style.color="red";
                }
                else if((age>30))
                {
                    status=false;
                    ageErr.innerHTML="Your are not allowed for this exam you are to older..";
                    ageErr.style.color="red";
                }
                else
                    ageErr.innerHTML="";

                return status;
            }

            function validateReEnterPassword(){
                var status = true;
                var email  = document.getElementById("rePassword").value;
                var passErr = document.getElementById("repassErr");
                if(email == ""){
                    status = false;
                    passErr.innerHTML = "please enter password ";
                    passErr.style.color = "red";
                } 
                else if(!(passwordMycode(email)))
                {
                    status = false;
                    passErr.innerHTML = "In password must be a one uupercase & lowercase & @ & number";
                    passErr.style.color = "red";
                }
                else if(!(email.length<=15))
                {
                    status = false;
                    passErr.innerHTML = "please length limit is 15 characters";
                    passErr.style.color = "red";
                }
                else if(!(email==confirmPassword))
                {
                    status = false;
                    passErr.innerHTML = "your password is not same as above password ";
                    passErr.style.color = "red";
                }
                else
                    passErr.innerHTML = "";

                return status;
            }
            function validateGender(){
                var status = true;
                var genderErr = document.getElementById("genderErr");
                var gender  = document.getElementById("gender").value;
                if(gender=="")  
                {
                    status = false;
                    genderErr.innerHTML = "please select gender";
                    genderErr.style.color = "red";
                }   
                else
                    genderErr.innerHTML = "";
              
                return status;
            }

            function validateMobiile(){
                var status = true;
                var mobile = document.getElementById("mobile").value;
                var mobileError = document.getElementById("mobileErr");
                if(mobile == ""){
                    status = false;
                    mobileError.innerHTML = "please enter mobile number";
                    mobileError.style.color = "red";
                }
                else if(isNaN(mobile)){
                    status = false;
                    mobileError.innerHTML = "Only digit allowed";
                    mobileError.style.color = "red";
                }
                else if(mobile.length!=10){
                    status = false;
                    mobileError.innerHTML = "Mobile must contain 10 digit";
                    mobileError.style.color = "red";
                }
                else
                 mobileError.innerHTML = "";
                return status;
            }

            function nameMycode(name)
            {
                var i;
                for(i=0;i<name.length;i++)
                {
                    if((name.charAt(i)>="A"&&name.charAt(i)<="Z"||(name.charAt(i)>="a"&&name.charAt(i)<="z")||name.charAt(i)==" "))
                        continue;
                    else
                        return false;
                }
                return true;
            }

            function validateName(){
                var status=true;
                var name=document.getElementById("eName").value;
                var errMsg=document.getElementById("userName");
                if(name=="")
                {
                    status=false;
                    errMsg.innerHTML="Please enter a name";
                    errMsg.style.color="red";
                }
                else if(!nameMycode(name))
                {
                    status=false;
                    errMsg.innerHTML="Please enter a valid name";
                    errMsg.style.color="red";
                }   
                else
                    errMsg.innerHTML="";

                return status;
            }
            function emailMycode(email) {
                //trim all spaces 
                email=email.trim();

                //check @ Is available or not
                var x=email.indexOf('@');
                if(x<0)
                    return false;

                //check before @ text is avilable or not
                if(x==0)
                    return false;

                //check how many time @ come
                var c=0;
                for(var i=0; i<email.length; i++)
                {
                    if('@'==email.charAt(i))
                        c++;
                }
                if(c>1)
                    return false;

                //check domain
                var i,d;
                d=email.lastIndexOf(".");
                for(i=d; i<email.length; i++);
                if(i-d-1==1)
                    return false;

                if(i-d-1>3)
                    return false;

                return true;
            }

            function validateEmail(){
                var status = true;
                var email  = document.getElementById("email").value;
                var emailError = document.getElementById("emailErr");
                if(email == ""){
                    status = false;
                    emailError.innerHTML = "please enter email id";
                    emailError.style.color = "red";
                } 
                else if(!emailMycode(email)){
                    status = false;
                    emailError.innerHTML = "Invalid email id";
                    emailError.style.color = "red";
                }
                else
                 emailError.innerHTML = "";
                return status;
            }

            function passwordMycode(email){
                var status =true;
                var upper=0,lower=0,number=0,symbol=0,fake=0;
                for(var i=0;i<email.length;i++){
                    if((email.charAt(i)>="A")&&(email.charAt(i)<="Z"))
                        upper++;
                    else if((email.charAt(i)>="a")&&(email.charAt(i)<="z"))
                        lower++;
                    else
                    {
                        fake++;
                        status=false;
                    }
                }

                if(fake==1)
                    return status;

                if(upper>0&&lower>0&&number>0)
                    status=true;
                
                return status;
            }

            function validatePassword(){
                var status = true;
                var email  = document.getElementById("password").value;
                var passErr = document.getElementById("passErr");
                console.log("length :"+email.length);
                if(email == ""){
                    status = false;
                    passErr.innerHTML = "please enter password ";
                    passErr.style.color = "red";
                } 
                else if(!(passwordMycode(email)))
                {
                    status = false;
                    passErr.innerHTML = "Number and other symbol are not allowed";
                    passErr.style.color = "red";
                }
                else if((email.length>15))
                {
                    status = false;
                    passErr.innerHTML = "password limit is 15 characters";
                    passErr.style.color = "red";
                }
                else
                    passErr.innerHTML = "";

                confirmPassword=email;
                return status;
            }

            function validateAddress(){
                var status = true;
                var email  = document.getElementById("address").value;
                var passErr = document.getElementById("addressErr");
                if(email == ""){
                    status = false;
                    passErr.innerHTML = "please enter address";
                    passErr.style.color = "red";
                } 
                else
                passErr.innerHTML = "";
                return status;
            }