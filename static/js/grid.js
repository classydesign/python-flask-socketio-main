var itemss = [
  { content: "my first widget" },
  { w: 2, content: "another longer widget!" },
  { h: 0, w: 3, content: "another widget!" },
];
var grid = GridStack.init();
//grid.load(items);

function addItem() {
  // $("#myModal").modal("show");
}

$(document).on("click", ".grid-stack-item-content", function () {
  alert("You clicked the element with and ID of 'test-element'");
  grid.removeWidget($("#chart1"));
});

function uuidv4() {
  /* return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, (c) =>
    (
      +c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (+c / 4)))
    ).toString(16)
  );*/
  return Math.random()
    .toString(36)
    .replace("0.", "view1" || "");
}
var widgetCount = 1;

function testWidget() {
  var newItem = { content: "New Widget" };

  var newItem = [
    {
      x: 0,
      y: 0,
      w: 5,
      h: 5,
      content: "hhh",
    },
  ];

  var widgetID = "chart" + widgetCount; //uuidv4();
  // var chartParams = { widgetid: widgetID, edgeDevice: $(".edgeDevice").val() };
  /*grid.addWidget(
    '<div class="grid-stack-item"><div class="grid-stack-item-content"><div id="' +
      widgetID +
      '"></div></div></div>',
    { w: 3, h: 3 }
  );*/

  $(".modal-body").append(
    '<div class="widgetTest" style="border:1px solid gray;border-radius:10px;padding:20px;" id="' +
      widgetID +
      '"></div>'
  );
  if ($(".widgetSelection").val() == "radialbar") {
    radialchart(widgetID);
    $(".widgetSelection").val("select");
  }
  widgetCount++;
}

function createWidget() {
  var newItem = { content: "New Widget" };
  // alert($(".widgetTest").attr("id"));
  var newItem = [
    {
      x: 0,
      y: 0,
      w: 5,
      h: 5,
      content: "hhh",
    },
  ];

  var widgetID = "chart" + widgetCount; //uuidv4();
  //$(".widgetTest").remove();
  // var chartParams = { widgetid: widgetID, edgeDevice: $(".edgeDevice").val() };
  grid.addWidget(
    '<div class="grid-stack-item"><div class="grid-stack-item-content"><div id="' +
      widgetID +
      '"></div></div></div>',
    { w: 3, h: 3 }
  );

  if ($(".widgetSelection").val() == "radialbar") {
    radialchart(widgetID);
    $(".widgetSelection").val("select");
  }
  widgetCount++;
}
function radialchart(widgetID) {
  //alert(JSON.stringify(chartParams["widgetid"]));

  var optionsRadial = {
    series: [],
    chart: {
      id: widgetID,
      height: 350,
      type: "radialBar",
      toolbar: {
        show: false,
      },
    },

    title: {
      text: "",
      align: "left",
      margin: 10,
      offsetX: 0,
      offsetY: 0,
      floating: false,
      style: {
        fontSize: "14px",
        fontWeight: "bold",
        fontFamily: undefined,
        color: "#263238",
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: "70%",
          background: "#fff",
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: "front",
          dropShadow: {
            enabled: true,
            top: 3,
            left: 0,
            blur: 4,
            opacity: 0.24,
          },
        },
        track: {
          background: "#fff",
          strokeWidth: "67%",
          margin: 0, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: -3,
            left: 0,
            blur: 4,
            opacity: 0.35,
          },
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: "#888",
            fontSize: "17px",
          },
          value: {
            formatter: function (val) {
              return parseInt(val);
            },
            color: "#111",
            fontSize: "36px",
            show: true,
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ABE5A1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    labels: ["Temperature"],
  };

  chart1 = new ApexCharts(
    document.querySelector("#" + widgetID),
    optionsRadial
  );
  chart1.render();
}
var chart1 = "";

/*
window.setInterval(function () {
  iteration++;

  
}, 3000);*/
