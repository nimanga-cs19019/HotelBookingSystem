import Nav from "./Nav";
function About() {

        return (
                <section className="container">
                        <img className="imgback" src="https://global-uploads.webflow.com/576fd5a8f192527e50a4b95c/5bfe547dc7e7c24e006ed95b_laya%20safari%20resort-min.jpg" alt="Background" />
                        <div className="content">
                                <Nav />
                                <h1 className="about">About Us</h1>
                                <section className='box1'>
                                        {/* Hotel Image */}

                                        <div className="image-box">
                                                <img src="https://tse1.mm.bing.net/th?id=OIP.eAe7La53T-dlbKgSoOS7oQHaEK&pid=Api&P=0&h=220" alt="" className="image image-4" />
                                                <p className="textabout text-4">Hospitality and services designed to the smallest details that will make you feel at home even if you are on holidays!</p>
                                        </div>


                                        <div className="image-box">
                                                <img src="https://i.pinimg.com/originals/17/6c/f6/176cf657897e64c7181715b340980c95.jpg" alt="" className="image image-3" />
                                                <p className="textabout text-3">Wander through the hotel’s natural trails, perfect for a peaceful morning walk</p>
                                        </div>


                                        <div className="image-box">
                                                <img src="https://www.coupercroiser.com/wp-content/uploads/2020/03/tapis-couvre-plancher-hotel.jpeg" alt="" className="image image-2" />
                                                <p className="textabout text-2">The 16 hotel rooms are perfectly equipped to meet the needs of people traveling for business or for leisure.</p>
                                        </div>
                                        <div className="image-box">
                                                <img src="http://www.hoteloffer.lk/wp-content/uploads/2021/02/Cinnamon-Hotels-and-Resorts.jpg" alt="" className="image image-1" />
                                                <p className="textabout text-1">Every room at the DREAM HOTEL is unique</p>

                                        </div>
                                </section>
                        </div>
                </section>


        );
};
export default About;