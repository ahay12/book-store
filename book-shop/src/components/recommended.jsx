export default function Recommended() {
    return (
        <>
            <div className="container py-10">
                <div className="flex flex-row">
                    <div className="flex w-1/2 justify-end px-5">
                        <img src="http://localhost:4000/images/recommended.jpg" className="skeleton w-[500px] h-[700px] bg-slate-200 rounded-2xl" />
                    </div>
                    <div className="flex w-1/2 justify-start px-5">
                        <div className="flex flex-col">
                            <img src="http://localhost:4000/images/ads.jpg" className="skeleton mb-5 w-[500px] h-[340px] bg-slate-200 rounded-2xl" />
                            <img src="http://localhost:4000/images/ads.jpg" className="skeleton mb-5 w-[500px] h-[340px] bg-slate-200 rounded-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
