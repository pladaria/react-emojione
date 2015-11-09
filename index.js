import React from 'react';
import ReactDOM from 'react-dom';
import shortnames from 'emoji-shortnames';
import ReactEmoji from './static/react-emojione';

const Emojis = ({category, text}) => (
  <div>
    <h1>{category}</h1>
    <div>
      {text}
    </div>
  </div>
);

const init = e => {
    // const node = document.getElementById('emojis');

    const categories = Object.keys(shortnames);

    const unicodes = "😀 😁 😂 😃 😄 😅 😆 😇 😈 👿 😉 😊 ☺ 😋 😌 😍 😎 😏 😐 😑 😒 😓 😔 😕 😖 😗 😘 😙 😚 😛 😜 😝 😞 😟 😠 😡 😢 😣 😤 😥 😦 😧 😨 😩 😪 😫 😬 😭 😮 😯 😰 😱 😲 😳 😴 😵 😶 😷 🙁 🙂 😸 😹 😺 😻 😼 😽 😾 😿 🙀 👣 👤 👥 🕴 🕵 👶 👦 👧 👨 👩 👪 👨👩👧 👨👩👧👦 👨👩👦👦 👨👩👧👧 👩👩👦 👩👩👧 👩👩👧👦 👩👩👦👦 👩👩👧👧 👨👨👦 👨👨👧 👨👨👧👦 👨👨👦👦 👨👨👧👧 👫 👬 👭 👯 👰 👱 👲 👳 👴 👵 👮 👷 👸 💂 👼 🎅 👻 👹 👺 💩 💀 👽 👾 🙇 💁 🙅 🙆 🙋 🙎 🙍 💆 💇 💑 👩❤👩 👨❤👨 💏 👩❤💋👩 👨❤💋👨 🙌 👏 👂 👁 👀 👃 👄 💋 👅 💅 👋 👍 👎 ☝ 👆 👇 👈 👉 👌 ✌ 👊 ✊ ✋ 💪 👐 🖎 🖐 🖕 🖖 🙏";
    console.time('ALL');
    const text = ReactEmoji.emojify(shortnames[categories[0]].join(' ') + unicodes);
    console.timeEnd('ALL');


    ReactDOM.render((
      <Emojis category={categories[0]} text={text} />
    ), document.getElementById('emojis'));
};

document.addEventListener('DOMContentLoaded', init);

