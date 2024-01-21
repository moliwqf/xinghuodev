document.addEventListener('DOMContentLoaded', function () {
    const animationContainer = document.getElementById('animationContainer');

    // 使用Web Speech API进行语音识别
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = function (event) {
        const speechText = event.results[0][0].transcript.toLowerCase();

        // 根据语音文本选择动画
        const animation = selectAnimation(speechText);

        // 播放动画
        playAnimation(animation);
    };

    recognition.onend = function () {
        // 在语音识别结束后重新启动
        recognition.start();
    };

    // 启动语音识别
    recognition.start();

    // 根据语音文本选择动画（示例）
    function selectAnimation(speechText) {
        if (speechText.includes('expand')) {
            return 'expand';
        } else if (speechText.includes('rotate')) {
            return 'rotate';
        } else {
            return 'default';
        }
    }

    // 播放动画（示例）
    function playAnimation(animationType) {
        // 清空容器
        animationContainer.innerHTML = '';

        // 创建动画元素
        const animationElement = document.createElement('div');
        animationElement.classList.add('animation');

        // 根据选择的动画类型添加不同的类
        if (animationType === 'expand') {
            animationElement.classList.add('expand-animation');
        } else if (animationType === 'rotate') {
            animationElement.classList.add('rotate-animation');
        }

        // 将动画元素添加到容器中
        animationContainer.appendChild(animationElement);
    }
});
