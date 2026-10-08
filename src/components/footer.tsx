import { MapPinned } from "lucide-react"
function Footer() {
    return (
        <div className="">
            <footer className="bg-[#EBE6D4] flex flex-col">
                <div className="footer flex flex-wrap xl:gap-60 sm:gap-15 lg:gap-35 text-base-content sm:p-10 pt-5  sm:py-15 py-7 sm:px-10 px-5">
                    <aside className="sm:pr-0 pr-20">
                        <h1 className="flex sm:text-3xl text-xl font-bold items-baseline pb-1 text-[##072629]"><MapPinned className="sm:size-5 size-4 text-[#072629ad]" />Tripy</h1>
                        <p className="font-semibold text-[#5E5C55] pb-7 sm:text-base text-sm">Choose Dream Destinations</p>
                        <nav className="flex gap-4 md:place-self-strat md:justify-self-start">
                            <a>
                                <svg
                                    aria-label="Twitter"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    aria-label="YouTube"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                                </svg>
                            </a>
                            <a>
                                <svg
                                    aria-label="Facebook"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    className="fill-current">
                                    <path
                                        d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                                </svg>
                            </a>
                        </nav>
                    </aside>
                    <nav className="xl:pr-20 pr-4">
                        <h6 className="footer-title ">Services</h6>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Branding</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Design</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Marketing</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Advertisement</a>
                    </nav>
                    <nav className="xl:pr-20 pr-4">
                        <h6 className="footer-title">Company</h6>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">About us</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Contact</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Jobs</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Press kit</a>
                    </nav>
                    <nav>
                        <h6 className="footer-title">Legal</h6>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Terms of use</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Privacy policy</a>
                        <a className="link link-hover text-[#26141A] sm:text-base text-xs">Cookie policy</a>
                    </nav>
                </div>
                <div className="border-t border-t-[#26141a2e] md:h-10 md:px-10 h-8 px-5 flex items-center">
                    <p className="md:text-sm text-xs text-[#26141a9b]">Copyright © {new Date().getFullYear()} - All right reserved</p>
                </div>
            </footer>

        </div>

    )
};
export default Footer;