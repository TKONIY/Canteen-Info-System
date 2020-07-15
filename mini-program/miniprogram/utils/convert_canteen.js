function convert_canteen(canteenno) {
  switch(canteenno){
    case 1: return "学一"; break;
    case 2: return "学二"; break;
    case 3: return "学三"; break;
    case 4: return "学四"; break;
    case 5: return "学五"; break;
    case 6: return "教一"; break;
    case 7: return "教二"; break;
    case 8: return "教三"; break;
    case 9: return "教四"; break;
    default: return "教五"; break;
  }
}

module.exports = {
  convert_canteen: convert_canteen
}