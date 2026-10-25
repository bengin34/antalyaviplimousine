import type { TransferLandingCopy } from "../transfer-landing-copy";

/**
 * Simplified Chinese needs no inflection, so the catalogue name is used as it
 * stands. The copy leads with the per-vehicle price and the cash payment on
 * the day, which is what differs from the prepaid packages a Chinese traveller
 * usually compares against.
 *
 * Written by the team, not natively reviewed yet — flag any wording a Chinese
 * reader would phrase differently before the next content pass.
 */
export const zh: TransferLandingCopy = {
  heroHeading: (name) => `安塔利亚机场 → ${name}专车接送`,
  heroCta: "预订接送",
  heroTrust: [
    "最多7位乘客",
    "无需预付",
    "直接向司机付款",
    "总价固定，无隐藏费用",
    "可免费提供儿童座椅",
    "含实时航班追踪",
  ],
  serviceHeading: (name) => `您前往${name}的专车接送`,
  aboutHeading: (name) => `目的地：${name}`,
  ownGroup: (name) =>
    `车上只有您和同行的人，直接送抵${name}的酒店。没有拼车巴士，没有陌生同乘者，也不会绕去其他酒店——固定价格按整车计算。`,
  arrivalHeading: "抵达安塔利亚机场",
  arrivalBody:
    "取到行李后，请前往接机区 Meet & Greet J / 777。我们的机场团队会找到您的预订，并把您交给司机。因为我们追踪航班，航班延误时接机时间随之调整，不另收费。",
  returnHeading: "返程接送",
  returnBody: (name) =>
    `我们同样可以安排从${name}返回安塔利亚机场的行程。预订时请告知航班号和希望的接车时间。`,
  privateHeading: "专车，而非拼车",
  privateBody: (name) =>
    `车内只有您和同行的旅客。预订后您会收到清晰的确认信息，包含行程细节和直接联系方式。抵达当天我们的团队会追踪您的航班；若提前或延后落地，我们相应调整接机时间。司机会连同行李把您送到酒店前台，或送到您在${name}提供的私人地址。`,
  priceBody:
    "显示的金额是整车的固定总价，而非每人价格。航班追踪、通常的等候时间以及按需提供的儿童座椅都不收取隐藏费用。您在行程开始时以现金直接支付给司机，因此费用在出行前就已确定。",
  vehicleHeading: "车辆、行李与儿童",
  vehicleBody:
    "奔驰 Vito 适合最多六位乘客及常规度假行李；人数较多的团队可乘坐最多12座的奔驰 Sprinter。如有超大行李、婴儿车或需要儿童座椅，请在预订时告知，我们会按人数安排合适的车辆。",
  wholeVehicle: "整车价格",
  priceTrust: [
    "无需预付",
    "直接向司机付款",
    "无隐藏费用",
  ],
  hotelsEyebrow: "送达您的住宿",
  hotelsHeading: (name) => `${name}的常订酒店`,
  hotelsBody: () => "我们直接送往这些酒店，也送往该区域的其他任何酒店。",
  faq: [
    [
      "在安塔利亚机场在哪里与接送团队会面？",
      "取到行李后前往接机区 Meet & Greet J / 777。我们的团队会找到您的预订，并带您去见司机。",
    ],
    [
      "需要提前支付接送费用吗？",
      "不需要。无需任何预付。固定总价在行程开始时直接支付给司机。",
    ],
    [
      "可以提供儿童座椅吗？",
      "可以。儿童座椅按需免费提供。请在预订时告知儿童人数和年龄。",
    ],
  ],
  regions: {
    antalya: {
      about: "安塔利亚市区连同拉拉和昆杜海滨地带，距机场仅几公里。拉拉海岸一线分布着大型主题度假村和市区酒店，西侧的孔亚阿尔特则有砾石海滩和长长的海滨步道。",
      routeDetails: "从安塔利亚机场出发的短途路线沿拉拉海岸公路行驶，或直接进入市中心。即使路程很短，专车依然划算：不必等候其他乘客，没有中途停靠，直接抵达您预订的酒店门口。",
    },
    belek: {
      about: "贝莱克位于安塔利亚以东，最为人熟知的是高尔夫球场、大型全包度假村和宽阔的沙滩。酒店分布在卡德里耶与塞里克附近海岸之间，因此预订时提供确切的酒店地址会更稳妥。",
      routeDetails: "行程从安塔利亚机场驶上D400公路，朝塞里克和贝莱克方向前行。对家庭出行、打高尔夫的客人和夜间航班来说，直达专车最为省心：无需沿途接客停靠，也不必换车。",
    },
    side: {
      about: "锡代把历史悠久的老城与长长的沙滩、大型度假综合体结合在一起。除锡代本身外，这一目的地还包括库姆科伊、埃夫伦塞基、乔拉克勒、索尔贡和蒂特雷延格尔等热门酒店区。",
      routeDetails: "从安塔利亚机场沿海岸公路朝马纳夫加特和锡代方向行驶。深夜抵达时专车尤其省力：您和同行的人直接前往预订的度假村，无需等候其他酒店的客人。",
    },
    kemer: {
      about: "凯梅尔位于安塔利亚以西，在托罗斯山脉与地中海之间。该区域包括凯梅尔中心以及贝尔迪比、戈伊纽克、基里什和恰姆尤瓦——海滨酒店、一座游艇码头，以及群山为背景的景观。",
      routeDetails: "直达路线沿安塔利亚以西的海岸线行驶。司机不换车把您一路送到酒店，也不必在途中等候其他酒店的客人，这在带孩子出行、携带运动器材或夜间落地时尤为重要。",
    },
    alanya: {
      about: "阿拉尼亚是土耳其里维埃拉最受喜爱的目的地之一，位置比安塔利亚周边的度假区更靠东。除市中心外，马赫穆特拉尔、凯斯泰尔、阿夫萨拉尔、蒂尔克莱尔和奥库尔贾拉尔是询问最多的酒店区域。",
      routeDetails: "在较长的沿海路线上，按整车计价的优势最为明显。乘坐专车，您只与同行的人同车，中途不接其他乘客，也不换车，从落地一路直达酒店前台。",
    },
    kizilagac: {
      about: "克孜勒阿加奇位于马纳夫加特以东，以宽敞的海滨度假村和安静的家庭假期著称。该区域与索尔贡和马纳夫加特相邻；许多酒店位于主干道稍内侧，紧邻海边。",
      routeDetails: "从安塔利亚机场沿D400公路朝马纳夫加特方向行驶，再继续前往克孜勒阿加奇。恰恰在这一路段，拼车接送常会额外停靠其他酒店，而专车不会。",
    },
    tekirova: {
      about: "泰基罗瓦位于凯梅尔以南，紧邻奥林波斯-贝伊达格拉尔国家公园边缘。这里把维护良好的度假村园区与小海湾连在一起，距古城法塞利斯遗址也很近。",
      routeDetails: "路线从安塔利亚机场经凯梅尔继续前往泰基罗瓦。考虑到沿海位置和距离，直达接送更为合理：不换车，也不必在前往酒店的路上等候其他客人。",
    },
  },
};
