(function($){	
    LMOD_Admin ={};
    LMOD_Admin.logIn = {};
    // is a unique interval id to pass for clearing the interval 
    LMOD_Admin.logIn.intervalId = null;
    // the amount of time to wait before function is called in milliseconds
    LMOD_Admin.logIn.intervalTime = null;
    LMOD_Admin.logIn.util ={
        
        /*
            Checks the if the logIn user is logged  on an interval base in milliseconds.
        */
        checkLoginOnInterval : function(time){			
            // stops any interval that has already been started
            LMOD_Admin.logIn.util.stopCheckLoginOnInterval();				
            LMOD_Admin.logIn.intervalTime = time;
            LMOD_Admin.logIn.intervalId = setInterval(function(){LMOD_Admin.logIn.util.checkLogin(null,null,false);},LMOD_Admin.logIn.intervalTime);
        },
        
        /*
            clears interval if one has already been started 
        */
        stopCheckLoginOnInterval : function(){
            if(LMOD_Admin.logIn.intervalId != null){
                clearInterval(LMOD_Admin.logIn.intervalId);
                LMOD_Admin.logIn.intervalId = null;
            }
        }, 
        /*
            Checks whether user is logged in and executes the correct callback when needed.
        */
        checkLogin : function(loggedOnCallback,notLoggedOnCallback,callSuccessOnSignIn){
            // stops any interval that has already been started
            LMOD_Admin.logIn.util.stopCheckLoginOnInterval();
            LMOD_Admin.logIn.network.checkLogin(function(data){
                if(data != null && data.loggedOn == false){	
                    if(notLoggedOnCallback != null){
                        notLoggedOnCallback();
                    }
                    if(callSuccessOnSignIn == false){
                        LMOD_Admin.logIn.util.openLoginMessage(data,null);
                    }else if (callSuccessOnSignIn == true){
                        LMOD_Admin.logIn.util.openLoginMessage(data,loggedOnCallback);
                    }
                }else{
                    if(LMOD_Admin.logIn.intervalTime != null){
                        LMOD_Admin.logIn.util.checkLoginOnInterval(LMOD_Admin.logIn.intervalTime);
                    }
                    if(loggedOnCallback != null){
                        loggedOnCallback();
                    }
                }
                
            });
        },
                    
        /*
            Signs in the user through  the login message box 
        */
        signIn: function(userId,password,successSignInCallBack){
            LMOD_Admin.logIn.network.signIn(userId,password,function(data){
                if(data.signedIn == true){
                    $("#logInSigInError").html("");
                    var loginDialog = $("#loginMessage");
                    // close dialog if logged in 
                    if(loginDialog != null && $(loginDialog).dialog( "isOpen" ) === true){
                        $(loginDialog).dialog("close");
                    }
                    // starts checking login on interval if checkLoginOnInterval was initiated before
                    if(LMOD_Admin.logIn.intervalTime != null){
                        LMOD_Admin.logIn.util.checkLoginOnInterval(LMOD_Admin.logIn.intervalTime);
                    }
                    if(successSignInCallBack != null){
                        successSignInCallBack();
                    }
                }else if(data.signedIn == false){
                    // if user has not been signed in returns an error message 
                    $("#logInSigInError").html(data.message);
                    $("#loginSign").prop("disabled",false);
                }
            });	
            
        },
        
        /*
            Opens Login Message dialog allowing the user to log back in 
        */
        openLoginMessage: function(data,successSignInCallBack){
            var loginDialog = null;
            
            //  creates loginMessage div if it does not exists 
            if($("#loginMessage").length == 0){
                loginDialog = $("<div>",{
                    id: "loginMessage",
                    title: data.title,
                    html: "<p>" + data.message+"</p>"
                    
                });
                $(document.body).append(loginDialog);
            }else{
                loginDialog = $("#loginMessage");
                $(loginDialog).attr("title", data.title);
                $(loginDialog).html("<p>" + data.message+"</p>");
            }
            // appends textboxs for user to login with 
            $(loginDialog).append("<div id='logInSigInError' class='errorMessage'> </div>");
            $(loginDialog).append("<span class='fieldText'>Enter your administrator user name:</span>");
            $(loginDialog).append("<span class='mandField'>* </span><br/>");
            $(loginDialog).append("<input type='text' id='logInUserId' /><br/>");
            $(loginDialog).append("<span class='fieldText'>Enter your administrator password:</span>");
            $(loginDialog).append("<span class='mandField'>* </span><br/>");					
            $(loginDialog).append("<input type='password' id='logInPassword' />");
            
            // creates div into dialog 
            $(loginDialog).dialog({
                autoopen: false,
                closeOnEscape: false,
                draggable : false,
                modal: true,
                open: function(event, ui) { $(".ui-dialog-titlebar-close",$(this).parent()).css("display","none"); },
                buttons:[
                        {
                            id: "loginSign",
                            text: "Sign In",
                            click: function(){ 
                                $("#loginSign").prop("disabled",true);
                                LMOD_Admin.logIn.util.signIn($("#logInUserId").val(),$("#logInPassword").val(),successSignInCallBack);
                            }
                        },
                        {
                            text: "cancel",
                            click: function() {window.location.href="notAdmin.action";}
                        }
                    ]
            });
            // opens dialog if it isn't already open 
            if($(loginDialog).dialog( "isOpen" ) === false){
                $(loginDialog).dialog("open");
            }	
        }
    };
    LMOD_Admin.logIn.network = {
        /*
            Makes call to check if user is logged in 
        */
        checkLogin : function (callback){
            $.post("/adminCheckLogin.action",function(data){callback(data);} );	
        },
        
        /*
            Makes call to login user
        */
        signIn: function(userId,password,callback){
            $.post("/adminAjaxSignIn.action",
                {
                    "userId" : userId,
                    "password": password
                },
                function(data){
                    callback(data);
                }
            );
        }
    };
})(window.jQuery);