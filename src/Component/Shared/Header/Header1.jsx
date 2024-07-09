// import { BsThreeDotsVertical } from "react-icons/bs";



const Header1 = () => {


  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">


        </div>
        <div className="flex-none">

          {/* translation english */}
          <div className="dropdown dropdown-end">
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn m-1">Click</div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
          </div>

          {/* profile */}

          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header1;