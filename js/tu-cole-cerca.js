/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function Buscar() {
    zona = document.getElementById("zona").value;
    nivel = document.getElementById("niveles").value;
    grado = document.getElementById("grados").value;
    jornada = document.getElementById("jornadas").value;
    especialidad = document.getElementById("especialidades").value;
    modelos_educativos = document.getElementById("modelos_educativos").value;
    tipos_establecimientos = document.getElementById("tipos_establecimientos").value;

    query = "$query=select * where codigodepartamento = '11' ";
    if (zona)
        zona = " and zona='" + zona + "'";
    if (nivel)
        nivel = " and niveles like '%25" + nivel + "%25'";
    if (grado)
        grado = " and grados  like '%25" + grado + "%25'";
    if (jornada)
        jornada = " and jornada like '%25" + jornada + "%25'";
    if (especialidad)
        especialidad = " and especialidad like '%25" + especialidad + "%25'";
    if (modelos_educativos)
        modelos_educativos = " and modelos_educativos like '%25" + modelos_educativos + "%25'";
    if (tipos_establecimientos)
        tipos_establecimientos = " and tipo_establecimiento like '%25" + tipos_establecimientos + "%25'";

    url = 'https://www.datos.gov.co/resource/xax6-k7eu.json?'
            + query + zona + nivel + grado + jornada + especialidad + modelos_educativos + tipos_establecimientos
            + '&$$app_token=K48oToivS8HmR2UDvdG3yrmeJ';
    $.getJSON(url, function (data, textstatus) {
        var iDiv = document.getElementById("listadocolegios");
        while (iDiv.firstChild) {
            iDiv.removeChild(iDiv.firstChild);
        }
        $.each(data,
                function (i, entry) {
                    var row = document.createElement('div');
                    row.class = 'row';
                    var colegio = document.createElement("div");
                    colegio.class = 'caption';
                    colegio.hidden = false;
                    colegio.id = "itemcolegio" + i;

                    var colegionombre = document.createElement("h3");
                    colegionombre.textContent = entry.nombreestablecimiento;

                    var datosbasicos = document.createElement("blockquote");

                    iDiv.appendChild(row);
                    row.appendChild(colegio);
                    colegio.appendChild(colegionombre);
                    colegio.appendChild(datosbasicos);

                    for (var i = 0; i < Object.getOwnPropertyNames(entry).length; i++) {
                        var propiedad = Object.getOwnPropertyNames(entry)[i];
                        if (propiedad.indexOf("codigo") === -1) {
                            var lbl = document.createElement("label");
                            var txt = document.createElement("p");
                            datosbasicos.appendChild(lbl);
                            datosbasicos.appendChild(txt);

                            lbl.textContent = propiedad.replace("a_o", "Año");
                            txt.textContent = entry[propiedad];
                        }
                    }
                });
    });
}