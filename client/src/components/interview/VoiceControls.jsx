import SpeechRecognition from "react-speech-recognition";

function VoiceControls({

    transcript,

    setAnswer,

    resetTranscript,

    speakQuestion,

    currentQuestion

}) {

    return (

        <div
            className="
                bg-white
                dark:bg-gray-800
                rounded-3xl
                shadow-xl
                p-6
                mt-8
                flex
                flex-wrap
                gap-4
                justify-center
            "
        >

            <button

                onClick={() =>
                    SpeechRecognition.startListening({
                        continuous: true,
                        language: "en-US"
                    })
                }

                className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                "

            >

                🎙 Start Recording

            </button>

            <button

                onClick={() => {

                    SpeechRecognition.stopListening();

                    setAnswer(transcript);

                }}

                className="
                    bg-green-600
                    hover:bg-green-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                "

            >

                ⏹ Stop Recording

            </button>

            <button

                onClick={() => {

                    resetTranscript();

                    setAnswer("");

                }}

                className="
                    bg-gray-600
                    hover:bg-gray-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                "

            >

                🗑 Clear

            </button>

            <button

                onClick={() =>
                    speakQuestion(currentQuestion)
                }

                className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-6
                    py-3
                    rounded-xl
                    font-semibold
                    transition
                "

            >

                🔊 Speak Again

            </button>

        </div>

    );

}

export default VoiceControls;