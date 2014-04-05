/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function setVariable(nombre, valor)
{
    localStorage[nombre] = valor;
}
function removeVariable(nombre)
{
    localStorage.removeItem(nombre);
}
//###################################### Variables ######################################
function getIdCiudad()
{
    var idCiudad;
    if (localStorage['idCiudad'] != null)
        idCiudad = localStorage['idCiudad'];
    else
        idCiudad = 151;
    return idCiudad;
}
function getIdUsuario()
{
    var idUsuario;
    if (localStorage['idUsuario'] != null)
        idCiudad = localStorage['idUsuario'];
    else
        idCiudad = -1;
    return idCiudad;
}
function getIdDireccion()
{
    var id;
    if (localStorage['idDireccion'] != null)
        id = localStorage['idDireccion'];
    else
        id = -1;
    return id;
}
function getCx()
{
    var r;
    if (localStorage['cx'] != null)
        r = localStorage['cx'];
    else
        r = 0
    return r;
}
function getCy()
{
    var r;
    if (localStorage['cy'] != null)
        r = localStorage['cy'];
    else
        r = 0;
    return r;
}
function getCarrito()
{
    var r;
    if (localStorage['carrito'] != null)
    {
        var aux = localStorage['carrito'];
        r = setCarrito(aux);
    } else
        r = new Carrito(getIdUsuario());
    return r;
}
function getCorreoUsuario()
{
    var r;
    if (localStorage['correoUsuario'] != null) {
        r = localStorage['correoUsuario'];
        if (r == "NULL" || r == "null") {
            localStorage.removeItem("correoUsuario");
            r = null;
        }
    } else
        r = null;
    console.log("r: " + r);
    return r;
}
function getConfirmarCompra()
{
    var r;
    if (localStorage['confirmarCompra'] != null)
        r = localStorage['confirmarCompra'];
    else
        r = false;
    return r;
}
function getClaveUsuario()
{
    var r;
    if (localStorage['claveUsuario'] != null)
        r = localStorage['claveUsuario'];
    else
        r = null;
    return r;
}
function getNombreCiudad()
{
    var r;
    if (localStorage['nombreCiudad'] != null)
        r = localStorage['nombreCiudad'];
    else
        r = "Bogota";
    return r;
}
function getDireccion()
{
    var r;
    if (localStorage['direccion'] != null)
        r = localStorage['direccion'];
    else
        r = null;
    return r;
}
function getNombreComercio()
{
    var r;
    if (localStorage['nombreComercio'] != null)
        r = localStorage['nombreComercio'];
    else
        r = null;
    return r;
}
function getTmpDireccion()
{
    var r;
    if (localStorage['tmpDireccion'] != null)
        r = localStorage['tmpDireccion'];
    else
        r = null;
    return r;
}
//###################################### Fin Variables ######################################
function checkConnection()
{
    var networkState = navigator.network.connection.type;
    var states = {};
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection')
    {
        return false;
    }
    return true;
}
//Muestra un dialogo que no se puede cerrar
function dialogo(mensaje)
{
    $('#element_to_pop_up').html("<div align='center'><img src='images/icon.png' width='72px' height='72px' /></div><br>"+mensaje);
    $('#element_to_pop_up').bPopup({
        speed: 1000,
        transition: 'slideDown',
        escClose: false,
        modalClose: false
    });

}
//Muestra un dialogo que se puede cerrar
function dialogoCierra(mensaje)
{
    $('#element_to_pop_up2').html("<div align='center'><img src='images/icon.png' width='72px' height='72px' /></div><br>"+mensaje);
    $('#element_to_pop_up2').bPopup({
        speed: 1000,
        transition: 'slideDown',
        escClose: true,
        modalClose: true
    });

}
function cerrarDialog(callback)
{
    console.log("Cerrando dialogo");
    //Cierro el mensaje
    $('#element_to_pop_up').bPopup().close();
    setInterval(callback(),1000);
}
function Carrito(id)
{
//Atributos
    //Id del usuario de este carrito de compras
    this.idUsuario = id;
    //Id del comercio
    this.idComercio = 0;
    //Costo del domicilio de este comercio
    this.valorDomicilio = 0;
    //Id de la ciudad del comercio
    this.idCiudad = 0;
    //Id de la agencia que hara la entrega
    this.idAgencia = 0;
    //Vector con los productos del carrito de compras
    this.productos = new Array();
    //Vector que contiene las adiciones del carrito de compras
    this.adiciones = new Array();
    //Variables para tener un id para cada producto, y un id para cada adicion
    this.cantP = 0;
    this.cantA = 0;
    //Variable para saber el total del carrito de compras
    this.total = 0;
    //Funciones
    //Agregar un producto al carrito de compras, recibe
    //idProdcuto    --> Id del producto de la base de datos
    //precio        --> precio de venta del producto
    //cantidad      --> cantidad del producto a agregar
    //nombre        --> nombre como se visualiza el producto
    //idcomercio    --> Id del comercio del producto
    this.addProducto = function(idProducto, precio, cantidad, nombre, idcomercio)
    {
        var puede = true;

        //Esto ocurre en caso de que el producto que se desea agregar sea de un 
        //comercio distinto a los productos anteriores
        if (idcomercio != this.idComercio)
            puede = false;
        //Si no existe algun producto, puedo agregarlo y actualizar el comercio
        if (this.productos.length == 0)
        {
            this.idComercio = idcomercio;
            puede = true;
        }
        if (puede)
        {
            var producto = new Array(5);
            producto[0] = this.cantP;
            producto[1] = idProducto;
            producto[2] = precio;
            producto[3] = cantidad;
            producto[4] = nombre;
            this.productos[this.productos.length] = producto;
            this.cantP++;
            return (this.cantP - 1);
        }
        else
        {
            return -1;
        }


    };
    //Agrega un producto al carrito de compras, desde un texto
    //id            --> id que identifica el producto en el arreglo
    //idProdcuto    --> Id del producto de la base de datos
    //precio        --> precio de venta del producto
    //cantidad      --> cantidad del producto a agregar
    //nombre        --> nombre como se visualiza el producto
    //posicion      --> posicion del vector donde se almacenara el producto
    this.addProducto1 = function(id, idProducto, precio, cantidad, nombre, pos)
    {
        var producto = new Array(5);
        producto[0] = id;
        producto[1] = idProducto;
        producto[2] = precio;
        producto[3] = cantidad;
        producto[4] = nombre;
        this.productos[pos] = producto;
        this.cantP++;
    };
    //Agrega una adicion al carrito de compras
    //idAdicion     --> id de la adicion de la base de datos
    //idProducto    --> id que identifica el producto al cual  en el arreglo, no confundir con el id del producto de la base de datos
    //precio        --> precio de venta del producto
    //cantidad      --> cantidad del producto a agregar
    //nombre        --> nombre como se visualiza el producto
    this.addAdicion = function(idAdicion, idProducto, precio, nombre, cantidad)
    {
        var adicion = new Array(6);
        adicion[0] = this.cantA;
        adicion[1] = idAdicion;
        adicion[2] = idProducto;
        adicion[3] = precio;
        adicion[4] = nombre;
        adicion[5] = cantidad;
        this.adiciones[this.adiciones.length] = adicion;
        this.cantA++;
    };
    this.addAdicion1 = function(id, idAdicion, idProducto, precio, nombre, cantidad, pos)
    {
        var adicion = new Array(6);
        adicion[0] = id;
        adicion[1] = idAdicion;
        adicion[2] = idProducto;
        adicion[3] = precio;
        adicion[4] = nombre;
        adicion[5] = cantidad;
        this.adiciones[pos] = adicion;
    };
    this.calcularTotal = function()
    {

        this.total = 0;
        //Recorro cada producto
        for (i = 0; i < this.productos.length; i++)
        {
            //Obtengo el producto de esta fila
            var producto = this.productos[i];
            //Multiplico el precio del producto por la cantidad
            var semi = parseInt(producto[2]) * parseInt(producto[3]);
            this.total += semi;
        }
        //Recorro cada adicion
        for (i = 0; i < this.adiciones.length; i++)
        {
            //Obtengo la adicion de esta fila
            var adicion = this.adiciones[i];
            //Multiplico el precio de la adicion por la cantidad
            var semi = parseInt(adicion[3]) * parseInt(adicion[5]);
            this.total += semi;
        }
        //Agrego el costo del domicilio
        this.total += parseInt(this.valorDomicilio);
        return this.total;
    };
    //Elimina un producto del carrito de compras, obteniendo el id en el vector
    this.eliminarProducto = function(id)
    {
        for (i = 0; i < this.productos.length; i++)
        {
            var producto = this.productos[i];
            if (producto[0] == id)
            {
                this.productos.splice(i, 1);
                console.log("Se elimino el producto " + producto[4] + " con id " + producto[0]);
                //Ahora elimino las adiciones que pertenecian a ese producto
                for (j = 0; j < this.adiciones.length; j++)
                {

                    var adicion = this.adiciones[j];
                    console.log("Analizando la adicion " + adicion[4] + " con idP " + adicion[2]);
                    if (adicion[2] == id)
                    {
                        this.adiciones.splice(j, 1);
                        //Reinicio el contador, debido a que al eliminar un elemento del array, las posiciones de los siguientes elementos cambia
                        j--;
                    }
                }
            }
        }
    };
    this.tieneAdiciones = function(id)
    {
        for (i = 0; i < this.productos.length; i++)
        {
            var producto = this.productos[i];
            if (producto[0] == id)
            {
                //Ahora determino si alguna adicion le pertenece a este producto
                for (j = 0; j < this.adiciones.length; j++)
                {
                    var adicion = this.adiciones[j];
                    if (adicion[2] == id)
                    {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    //Genero un string de este objeto
    this.toString = function()
    {
        var str = "";
        str += this.idUsuario + "_";
        str += this.cantP + "_";
        str += this.cantA + "_";
        //Recorro los productos
        if (this.productos.length > 0)
        {
            for (i = 0; i < this.productos.length; i++)
            {
                //Obtengo el producto de esta fila
                var producto = this.productos[i];
                str += producto[0] + "-" + producto[1] + "-" + producto[2] + "-" + producto[3] + "-" + producto[4] + "*";
            }
        }
        else
        {
            str += "null";
        }

        str += "_";
        //Recorro cada adicion
        if (this.adiciones.length > 0)
        {
            for (i = 0; i < this.adiciones.length; i++)
            {
                //Obtengo el adicion de esta fila
                var adiciones = this.adiciones[i];
                str += adiciones[0] + "-" + adiciones[1] + "-" + adiciones[2] + "-" + adiciones[3] + "-" + adiciones[4] + "-" + adiciones[5] + "*";
            }
        }
        else
        {
            str += "null";
        }
        //Parametros del comercio
        str += "_";
        str += this.idComercio + "_";
        str += this.valorDomicilio + "_";
        str += this.idCiudad + "_";
        str += this.idAgencia + "_";
        return str;

    };
}
//Se encarga de convertir una cadena de texto en un objeto carrito
function setCarrito(str)
{
    //Variables globales
    var idUsuario, cantP, cantA, idComercio, valorDomicilio, idCiudad, idAgencia;
    //Variables del producto
    var productos, id, idp, cantidad, precio, nombre;
    //variables adiciones
    var adiciones, idA;
    //Recorro el string
    var ele = str.split("_");
    idUsuario = ele[0];
    cantP = ele[1];
    cantA = ele[2];
    productos = ele[3];
    adiciones = ele[4];
    idComercio = ele[5];
    valorDomicilio = ele[6];
    idCiudad = ele[7];
    idAgencia = ele[8];
    //creo el objeto
    var car = new Carrito(idUsuario);
    car.cantP = cantP;
    car.cantA = cantA;
    //ahora recorro cada producto
    if (productos != "null")
    {
        var pro = productos.split("*");
        for (var i = 0; i < pro.length - 1; i++)
        {
            //Obtengo los elementos de cada producto
            var pro2 = pro[i].split("-");
            id = pro2[0];
            idp = pro2[1];
            precio = pro2[2];
            cantidad = pro2[3];
            nombre = pro2[4];
            //Agrego el producto al carrito
            car.addProducto1(id, idp, precio, cantidad, nombre, i);
        }
    }
    //ahora recorro cada adicion
    if (adiciones != "null")
    {
        var adi = adiciones.split("*");
        for (var i = 0; i < adi.length - 1; i++)
        {
//Obtengo los elementos de cada producto
            var adi2 = adi[i].split("-");
            id = adi2[0];
            idA = adi2[1];
            idp = adi2[2];
            precio = adi2[3];
            nombre = adi2[4];
            cantidad = adi2[5];
            //Agrego la adicion al carrito
            car.addAdicion1(id, idA, idp, precio, nombre, cantidad, i);
        }
    }
    car.idComercio = idComercio;
    car.valorDomicilio = valorDomicilio;
    car.idCiudad = idCiudad;
    car.idAgencia = idAgencia;
    return car;
}
//Permite establecer el id del comercio y el valor del domicilio, si no hay productos en la lista
function setDetallesComercioCarrito(idcomercio, valordomicilio, idciudad, idagencia, nombreComercio)
{
    var car = getCarrito();
    if (car.productos.length === 0)
    {
        car.idComercio = idcomercio;
        car.valorDomicilio = valordomicilio;
        car.idCiudad = idciudad;
        car.idAgencia = idagencia;
        setVariable("nombreComercio", nombreComercio);
    }

    setVariable("carrito", car.toString());
}
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
function addProducto(id, precio, cantidad, nombre, idcomercio)
{
    var car = getCarrito();
    var r = car.addProducto(id, precio, cantidad, nombre, idcomercio);
    setVariable("carrito", car.toString());
    return r;
}
function addAdicion(idA, idP, precio, nombre, cantidad)
{
    var car = getCarrito();
    car.addAdicion(idA, idP, precio, nombre, cantidad);
    setVariable("carrito", car.toString());
}
/*
 * Da formato a un n�mero para su visualizaci�n
 *
 * numero (Number o String) - N�mero que se mostrar�
 * decimales (Number, opcional) - N� de decimales (por defecto, auto)
 * separador_decimal (String, opcional) - Separador decimal (por defecto, coma)
 * separador_miles (String, opcional) - Separador de miles (por defecto, ninguno)
 */
function formato_numero(numero, decimales, separador_decimal, separador_miles) { // v2007-08-06
    numero = parseFloat(numero);
    if (isNaN(numero)) {
        return "";
    }

    if (decimales !== undefined) {
// Redondeamos
        numero = numero.toFixed(decimales);
    }

// Convertimos el punto en separador_decimal
    numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");
    if (separador_miles) {
// A&ntilde;adimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}
//Elimina todo los datos de sesion
function cerrarSesion(nivel)
{
//Elimino las variables
    var se = new Array("idCiudad", "idUsuario", "idDireccion", "cx", "cy", "carrito", "correoUsuario", "confirmarCompra", "claveUsuario", "nombreCiudad", "direccion", "nombreComercio", "tmpDireccion");
    se.forEach(function(e)
    {
        localStorage.removeItem(e);
    });
    //redirijo
    $(location).attr("href", nivel + "index.html");
}
//Eliminar todos los datos, excepto los del usuario
function nuevaSesion()
{
    //Elimino las variables
    var se = new Array("idCiudad", "idDireccion", "cx", "cy", "carrito", "confirmarCompra", "nombreCiudad", "direccion", "nombreComercio", "tmpDireccion");
    se.forEach(function(e)
    {
        localStorage.removeItem(e);
    });
}

//	The menu on the left
var efect = true;
var tiem = 350;
function efecto()
{
    if (efect)
    {
        var le = $("#iconMenu2").css("left");
        if (le == "-12px") {
            $("#iconMenu2").animate({"left": "-10px"}, tiem, function()
            {
                efecto();
            });
            //$("#iconMenu2").animate({"left":"0px"},tiem);
        } else
            $("#iconMenu2").animate({"left": "-12px"}, tiem, function()
            {
                efecto();
            });
        //$("#iconMenu2").animate({"left":"-2px"},tiem);
    }


}
//Para saber cuantos pixeles ha bajado
var pixDown = 0;
var posM = 0;
var posC = 0;
function iniciarMenu()
{
    $("#iconMenu2").click(function()
    {
        //Saber cuantos pixeles se ha bajado con el scroll
        pixDown = $(document).scrollTop();
        //Saber la posicion actual del elemento que permite abrir el menu
        var posicion = $(this).position();
        posM = posicion.top;
    });
    $("#iconMenu").click(function()
    {
        //Saber cuantos pixeles se ha bajado con el scroll
        pixDown = $(document).scrollTop();
        //Saber la posicion actual del elemento que permite abrir el menu
        var posicion = $(this).position();
        posM = posicion.top;
    });
    $('nav#menu-left').mmenu({}, {transitionDuration: 400})
            .on(
                    "closed.mm",
                    function()
                    {
                        //$("#iconMenu, #iconMenu2").animate({"left": "-2px"}, 400);
                        $("#iconMenu").css({"position": "fixed", "top": 0}, 0);
                        $("#iconMenu2").css({"position": "fixed", "top": "40%"}, 0);
                        $(".footer").css({"position": "fixed"}, 0);
                        efect = true;
                        efecto();
                    }
            ).on(
            "opening.mm",
            function()
            {
                efect = false;
                //$("#iconMenu, #iconMenu2").animate({"left": "80%"}, 400);
                //obntego la distancia que ha bajado

                var s = $('body').scrollTop();

                //console.log("pix: "+$(document).scrollTop());
                $("#iconMenu").css({"position": "absolute", "top": pixDown}, 0);
                $("#iconMenu2").css({"position": "absolute", "top": pixDown + posM}, 0);
                $(".footer").css({"position": "absolute"}, 0);
            }
    );
    efecto();
    //Muestro el correo del usuario
    if (getCorreoUsuario() != null)
        $("#welc").html(getCorreoUsuario());
    else{
        $("#welc").html("");
        //Oculto el cerrar sesion
        $("#cerrarsesion").css("display","none");
    }
    
    //Funcion para cuando oprime el link superior que dice back
    back();

}
function filterList(header, list)
{
    var form = $("<form>").attr({"action": "#"}),
    input = $("<input/>").attr({"type": "text"});
    $(form).append(input).appendTo(header);
    var filter = "";

    jQuery.expr[":"].Contains = jQuery.expr.createPseudo(function(arg) {
        return function(elem) {
            return jQuery(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
        };
    });
    
//    $(input).keydown(function(tecla)
//    {
//        //Obtengo la tecla que se oprimio
//        
//    });
    $(form).submit(function(e)
    {
        e.preventDefault();
    });
    $(input).change(function()
    {
        
        //Palabra a buscar
        filter = $(this).val().toUpperCase();

        //Si la palabra es diferente de vacia
        if (filter) {
            //Busco dentro de la lista todo aque enlacel <a> que contenga la palabra
            //En caso de encontrar algo, retorno su pabre, que seri el li
            //console.log("sltBuscar: "+$("#sltBuscar").val());
            if ($("#sltBuscar").val() == "nombre") {
                //Obtengo el texto dentro de h4
                $matches = $(list).find('h4:Contains(' + filter + ')').parent().parent().parent().parent().parent();
            } else {
                $matches = $(list).find('p:Contains(' + filter + ')').parent().parent().parent().parent().parent();
            }
            $('li', list).not($matches).slideUp();
            $matches.slideDown();
        } else {
            $(list).find("li").slideDown();
        }
        return false;
    })
            .keyup(function(tecla) {
                console.log("Tecla: "+tecla.keyCode);
                //Si la tecla que se oprime es la 13, no busco texto, sino que oculto el teclado
                if(tecla.keyCode==13)
                    $(this).blur();
                else
                    $(this).change();
            });
//    $("#sltBuscar").change(function()
//    {
//        //Palabra a buscar
//
//        //Si la palabra es diferente de vacia
//        if (filter) {
//            //Busco dentro de la lista todo aque enlace <a> que contenga la palabra
//            //En casi de encontrar algo, retorno su pabre, que seri el li
//            //console.log("sltBuscar: "+$("#sltBuscar").val());
//            if ($("#sltBuscar").val() == "nombre")
//                $matches = $(list).find('h4:Contains(' + filter + ')').parent().parent().parent().parent().parent();
//            else
//                $matches = $(list).find('p:Contains(' + filter + ')').parent().parent().parent().parent().parent();
//            $('li', list).not($matches).slideUp();
//            $matches.slideDown();
//        } else {
//            $(list).find("li").slideDown();
//        }
//        return false;
//    });
}

function salir()
{
    console.log("Tratando de salir");
    navigator.app.exitApp();
    nuevaSesion();
    //device.exitApp();
}
function back()
{
    $(".back").click(function (e)
    {
        e.preventDefault();
        navigator.app.backHistory();
    });
    
}
//Funcion que se encarga de escuchar el evento de deslizar el dedo y abre el menu
$$(document).ready(function ()
{
    $$('body').swipeRight(function()
    {
        $('#iconMenu2').click();
    });
});