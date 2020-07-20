(function(win, doc, $) {
  //"use strict";

  // Don't run script if jQuery isn't loaded
  //if (typeof win.jQuery === "undefined") {
  // console.log("no jQuery");
  // return;
  //}

  var data, fillForm, FormData, len;

  // I like Chris's (http://chriscoyier.net/) randomize function.  Lets use it here.
  function _rand(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function fixRandMonth(input) {
    if (input < 10) {
      return "0" + input;
    } else {
      return input;
    }
  }

  var getScriptEmail = (function() {
    var scripts = document.getElementsByTagName("script");
    var index = scripts.length - 1;
    var myScript = scripts[index];
    return function() {
      return myScript.getAttribute("data-email");
    };
  })();

  // Load FakerJS library
  //$.getScript("//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js")
  // .done(function() {
  //   fillForm();
  // })
  // .fail(function() {
  //   win.console.error("ERROR: FakerJS not loaded!");
  // });

  // Load FakerJS library
  var script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js";
  script.onload = function() {
    fillForm();
  };
  document.head.appendChild(script);

  //Random CPF in list
  function randCPF() {
    var lstCPF = [
      "86251455900",
      "94913663780",
      "28330224171",
      "90856867926",
      "71727173333",
      "20307926834",
      "69187169649",
      "55776839475",
      "26245673640",
      "98147565801",
      "95075026702",
      "89180952283",
      "24486247710",
      "78268391308",
      "77527849312",
      "22331000344",
      "88496765300",
      "56882429731",
      "66488143816",
      "74683556227",
      "12704622299",
      "13935349459",
      "44738994549",
      "28272010895",
      "85351346893",
      "15716719279",
      "92207458873",
      "83183651513",
      "68578498704",
      "25224316685",
      "52713741572",
      "70376694076",
      "72364555710",
      "56107263446",
      "14213785661"
    ];
    return lstCPF[Math.floor(Math.random() * lstCPF.length)];
  }

  //Random CEP in list
  function randCEP() {
    var lstCEP = [
      "26380-490",
      "03977-580",
      "60415-650",
      "54460-610",
      "26112-090",
      "35701-298",
      "40325-515",
      "31580-271",
      "35182-078",
      "61919-230",
      "30230-010",
      "06328-110",
      "73813-190",
      "20541-270",
      "17013-280",
      "14802-630",
      "79073-663",
      "06056-432",
      "65630-110",
      "13471-261",
      "88066-575",
      "24020-108",
      "05857-310",
      "55602-001",
      "13331-154",
      "69079-220",
      "19906-541",
      "74926-610"
    ];
    return lstCEP[Math.floor(Math.random() * lstCEP.length)];
  }

  //Random Phone BR in list
  function randPhoneBR() {
    var lstPhone = [
      "(85) 2284-7035",
      "(31) 7719-5565",
      "(11) 6331-9289",
      "(61) 9060-5148",
      "(21) 5336-9131",
      "(14) 6117-9176",
      "(16) 5417-3520",
      "(67) 3341-9574",
      "(11) 8498-4144",
      "(99) 8856-4844",
      "(19) 5411-2670",
      "(48) 2950-2330",
      "(21) 5010-3193",
      "(11) 4763-5078",
      "(62) 6246-3650",
      "(51) 9311-6270",
      "(61) 9192-9372",
      "(19) 5117-8999",
      "(31) 6498-3808",
      "(11) 8229-8272",
      "(53) 6824-3161",
      "(82) 8003-8389",
      "+55 (71) 6475-3177"
    ];
    return lstPhone[Math.floor(Math.random() * lstPhone.length)];
  }

  //Get First Name/ Last Name from email
  function getFirstName() {
    var email = getScriptEmail();
    var firstName = email.slice(0, email.indexOf("."));
    firstName = firstName.charAt(0).toUpperCase() + firstName.substring(1);
    return firstName + "_fake";
  }

  //Get Last Name from email
  function getLasttName() {
    var email = getScriptEmail();
    var lastName = email.slice(0, email.indexOf("@"));
    var lastName1 = lastName.length - lastName.lastIndexOf(".") - 1;
    var lastName2 = lastName.slice(-lastName1, email.lastIndexOf("@"));
    lastName = lastName2.charAt(0).toUpperCase() + lastName2.substring(1);
    return lastName + "_fake";
  }

  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {
    this.faker = faker;

    this.randomWord = faker.Internet.domainWord();

    //this.firstname = "Kieu"; //faker.Name.firstName() + "_fake";
    //this.lastname = "Nguyen"; //faker.Name.lastName() + "_fake";
    this.firstname = getFirstName();
    this.lastname = getLasttName();

    this.address1 = faker.Address.streetAddress() + "_fake";
    this.city = faker.Address.city() + "_fake";
    this.zip = faker.Address.zipCode();
    this.phone = _rand(10000, 129999999);

    this.cardNo = "4000000000000010";
    this.cvv = _rand(100, 999);
    this.cardExpiryYear = fixRandMonth(_rand(1, 12)) + "/" + _rand(21, 37);

    //For Brazil language
    this.CEP = randCEP();
    this.CPF = randCPF();
    this.phoneBR = randPhoneBR();
    this.numberAddress = _rand(1, 1000);
  };

  FormData.prototype.randomizeSelect = function(el) {
    var $el = $(el);

    len = $el.find("option").length - 1;

    $el
      .children("option")
      .prop("selected", false)
      .eq(_rand(1, len + 1))
      .prop("selected", true);
    console.log("$el", $el);
    $el.trigger("change");
  };

  FormData.prototype.randomizeParagraph = function(el) {
    $(el).val(this.faker.Lorem.sentence(5));
  };

  FormData.prototype.randomizeEmail = function(el) {
    var email = getScriptEmail();
    //var random = this.randomWord + _rand(1, 10000);
    var random = _rand(1, 10000);
    //$(el).val(email.replace(/{RANDOM}/gi, random));
    if (typeof $ !== "function") {
      el.value = email.split("@")[0] + "+" + random + "@" + email.split("@")[1];
    } else
      $(el).val(email.split("@")[0] + "+" + random + "@" + email.split("@")[1]);
    // $(el).val("joanne.choi_" + this.randomWord + _rand( 1, 10000 ) + "_fake@user.intmams.info");
  };

  function randomAddress(txtFiled) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    //return "Test Complemento " + text;
    return txtFiled + _rand(1, 1000);
  }

  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function() {
    data = new FormData(win.Faker);

    if (typeof $ !== "undefined") {
      $("#firstname, .firstname, input[name=FirstName]").val(data.firstname);
      $("#lastname, .lastname, input[name=LastName]").val(data.lastname);
      $("#address, .address, input[name=Address]").val(data.address1);
      $("#city, .city, input[name=City]").val(data.city);
      $("#state, .state, select[name=Province]").val(data.state);
      data.randomizeEmail($("#email, .email, input[name=Email]"));
      data.randomizeSelect(
        $("#countrylist, .countrylist, select[name=Country]")
      );
      data.randomizeSelect($("#statelist, .statelist, select[name=Province]"));

      $("#cardNo, input[name=CreditCardNumber]").val(data.cardNo);
      data.randomizeSelect($("#cardExpiryMonth"));
      data.randomizeSelect($("#cardExpiryYear"));
      $("#cardSecurityCode, input[name=CreditCardCVV]").val(data.cvv);
      if ($("#cardExpiryMonth").length > 0) {
        $("#creditCardFullDate").val(
          $("#cardExpiryMonth").val() + "/" + $("#cardExpiryYear").val()
        );
      } else {
        $("#creditCardFullDate").val(data.cardExpiryYear);
      }

      $("input[name=CreditCardExpiry]").val(data.cardExpiryYear);

      //For Brazil language
      if (
        $("#CPF, .CPF, input[name=CPF], #cpf, .cpf, input[name=cpf]").length > 0
      ) {
        $("#phone, .phone, input[name=Phone]").val(data.phoneBR);
        $("#CPF, .CPF, input[name=CPF], #cpf, .cpf, input[name=cpf]").val(
          data.CPF
        );
        $("#zip, .zip, input[name=Zipcode]").val(data.CEP);
        $("#numberAddress, .numberAddress, input[name=numberAddress]").val(
          data.numberAddress
        );
        $("#Complemento, .Complemento, input[name=Unit]").val(
          randomAddress("Test Complemento ")
        );
      } else {
        $("#zip, .zip, input[name=Zipcode]").val(data.zip);
        $("#phone, .phone, input[name=Phone]").val(data.phone);
      }
    }
    //NEW FRAMEWORK
    // var iframe = document.querySelector('iframe');
    // if(iframe) { //check if in dotAdmin with iframe
    //     doc = iframe.contentDocument || iframe.contentWindow.document;
    // }

    //First Name Filed
    if (doc.getElementById("customer_firstname")) {
      doc.getElementById("customer_firstname").value = data.firstname;
    }
    if (doc.getElementById("shipping_firstname")) {
      doc.getElementById("shipping_firstname").value = data.firstname;
    }
    if (doc.getElementById("billing_firstname")) {
      doc.getElementById("billing_firstname").value = data.firstname;
    }

    //Last Name Field
    if (doc.getElementById("customer_lastname")) {
      doc.getElementById("customer_lastname").value = data.lastname;
    }
    if (doc.getElementById("shipping_lastname")) {
      doc.getElementById("shipping_lastname").value = data.lastname;
    }
    if (doc.getElementById("billing_lastname")) {
      doc.getElementById("billing_lastname").value = data.lastname;
    }

    //Email Field
    data.randomizeEmail(doc.getElementById("customer_email"));
    if (doc.getElementById("billing_email")) {
      data.randomizeEmail(doc.getElementById("billing_email"));
    }

    //Credit Card Information Files
    if (doc.getElementById("creditcard_creditcardnumber")) {
      doc.getElementById("creditcard_creditcardnumber").value = data.cardNo;
    }
    if (doc.getElementById("creditcard_expirydate")) {
      doc.getElementById("creditcard_expirydate").value = data.cardExpiryYear;
    }
    if (doc.getElementById("creditcard_cvv")) {
      doc.getElementById("creditcard_cvv").value = data.cvv;
    }

    //Address Filed
    if (doc.getElementById("shipping_address1")) {
      doc.getElementById("shipping_address1").value = data.address1;
    }
    if (doc.getElementById("billing_address1")) {
      doc.getElementById("billing_address1").value = data.address1;
    }

    //City Filed
    if (doc.getElementById("shipping_city")) {
      doc.getElementById("shipping_city").value = data.city;
    }
    if (doc.getElementById("billing_city")) {
      doc.getElementById("billing_city").value = data.city;
    }

    //Province Filed
    if (doc.querySelectorAll("#shipping_province option").length > 1) {
      doc.querySelectorAll("#shipping_province option")[1].selected = true;
    }
    if (doc.querySelectorAll("#billing_province option").length > 1) {
      doc.querySelectorAll("#billing_province option")[1].selected = true;
    }

    //For Brazil language
    if (doc.getElementById("customer_cpf")) {
      doc.getElementById("customer_cpf").value = data.CPF;
      if (doc.getElementById("customer_phone")) {
        doc.getElementById("customer_phone").value = data.phoneBR;
      }
      if (doc.getElementById("shipping_cep")) {
        doc.getElementById("shipping_cep").value = data.CEP;
      }
      if (doc.getElementById("shipping_numero")) {
        doc.getElementById("shipping_numero").value = data.numberAddress;
      }
      if (doc.getElementById("shipping_complemento")) {
        doc.getElementById("shipping_complemento").value = randomAddress(
          "Test Complemento "
        );
      }
    } else {
      //Phone Field
      if (doc.getElementById("customer_phone")) {
        doc.getElementById("customer_phone").value = data.phone;
      }
      if (doc.getElementById("billing_phone")) {
        doc.getElementById("billing_phone").value = data.phone;
      }

      //doc.getElementById("shipping_postal").value = data.zip;
      if (doc.getElementById("shipping_postal")) {
        doc.getElementById("shipping_postal").value = data.zip;
      }
      if (doc.getElementById("billing_postal")) {
        doc.getElementById("billing_postal").value = data.zip;
      }
      if (doc.getElementById("shipping-postal")) {
        doc.getElementById("shipping-postal").value = data.zip;
      }
      //ecom
      if (doc.getElementById("shipping_postcode")) {
        doc.getElementById("shipping_postcode").value = data.zip;
      }
      if (doc.getElementById("billing_postcode")) {
        doc.getElementById("billing_postcode").value = data.zip;
      }
    }

    //Mexico form
    if (doc.getElementById("shipping_streetnumber")) {
      doc.getElementById("shipping_streetnumber").value = randomAddress(
        "Test Número de la calle "
      );
    }

    if (doc.getElementById("shipping_streetname")) {
      doc.getElementById("shipping_streetname").value = data.address1;
    }
  };
})(window, window.document, window.jQuery);