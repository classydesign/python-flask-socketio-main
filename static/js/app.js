$(document).ready(function () {
  /* const ctx = document.getElementById("myChart").getContext("2d");

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      datasets: [{ label: "Temperature" }],
    },
    options: {
      borderWidth: 3,
      borderColor: ["rgba(255, 99, 132, 1)"],
    },
  });*/

  function addData(label, data) {
    myChart.data.labels.push(label);
    myChart.data.datasets.forEach((dataset) => {
      dataset.data.push(data);
    });
    myChart.update();
  }

  function removeFirstData() {
    myChart.data.labels.splice(0, 1);
    myChart.data.datasets.forEach((dataset) => {
      dataset.data.shift();
    });
  }

  const MAX_DATA_COUNT = 10;
  //connect to the socket server.
  //   var socket = io.connect("http://" + document.domain + ":" + location.port);
  var socket = io.connect();

  //receive details from server
  socket.on("updateSensorData", function (msg) {
    console.log(msg);
    //console.log("Received sensorData :: " + msg.date + " :: " + msg.value);
    for (var i = 0; i < msg.length; i++) {
      console.log(msg[i].chartid);
      var ws = msg[i].chartid;

      ApexCharts.exec(ws, "updateSeries", [msg[i].value]);
      ApexCharts.exec(ws, "updateOptions", {
        title: {
          text: [
            "edgeDevice :" + msg[i].edgeDevice,
            "Threshold :" + msg[i].threshold,
          ],
        },
      });

      if ([msg[i].value] > [msg[i].threshold]) {
        ApexCharts.exec(ws, "updateOptions", {
          fill: {
            type: "gradient",

            gradient: {
              shade: "dark",
              type: "vertical",
              shadeIntensity: 0.5,
              gradientToColors: ["#D9534F"],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
        });
      } else if ([msg[i].value] < [msg[i].threshold]) {
        ApexCharts.exec(ws, "updateOptions", {
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "radial",
              shadeIntensity: 0.5,
              gradientToColors: ["#ABE5A1"],
              inverseColors: false,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100],
            },
          },
        });
      }

      // $("#" + ws).updateOptions({
      //   title: {
      //     text: "hello",
      //   },
      // });

      /* chart1.updateSeries([
        msg[i].value,
        msg[i].value * 0.5,
        //({ min: 10, max: 100 }),
        //getRangeRandom({ min: 10, max: 100 }),
      ]);*/
    }

    /*
    // Show only MAX_DATA_COUNT data
    if (myChart.data.labels.length > MAX_DATA_COUNT) {
      removeFirstData();
    }
    addData(msg.date, msg.value);*/
  });
});
