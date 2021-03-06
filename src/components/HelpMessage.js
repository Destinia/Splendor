import React from 'react';

import '../css/bootstrap-material-design.css';
import '../css/center-util.css';

class HelpMessage extends React.Component {
  render() {
    return (
      <div className="col-md-4 col-md-offset-4 text-center vcenter help-message-setting">
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">規則說明</h3>
        </div>
        <embed src="http://www.gokids.com.tw/tsaiss/Asmodee/Rules/Splendor_0627Chinese.pdf"
          width="800" height="300" />
        <br />
        <div className="panel-body">
          操作說明：
          
          點擊右方Token拿取
          超過10個需要還回去
          點擊下方放回
          點擊卡片購買
          點擊貴族卡拿取(無須在自己回合)
          卡片透明為餘額不足
          雙擊卡片上寶石保留卡片
          保留之卡片將置於玩家頭像旁
          在自己回合中點擊可購買
          點擊右側敵方玩家頭像展開玩家背包
          再點擊收回
        </div>
      </div>
      </div>
    );
  }
}

export default HelpMessage;
