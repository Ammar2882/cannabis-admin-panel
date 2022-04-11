export const DashCard = ({ bg, header, footer, value, icon }) => {
    return (

        <div class={`${bg} flex flex-col my-2 justify-between rounded-lg py-2 px-4 h-36 w-64 shadow-xl border w-xl`}>
            <p>
                {header}
            </p>
            <div className="flex justify-between">
                <p className="font-medium text-3xl">
                    {value}
                </p>
                <img className="w-12" src={icon} alt="dash-icon" />
            </div>


            <p>
                {footer}
            </p>

        </div>

    )
}