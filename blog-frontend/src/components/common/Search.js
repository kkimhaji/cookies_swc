import React from 'react';
import { withRouter, Link} from 'react-router-dom';
import 'bulma/css/bulma.css';
import axios from 'axios';


const Search = ({history}) => {
    class App extends React.Component {
        constructor(props) {
          super(props);
          //this.data = postsAPI.searchPost;
          this.state = {
            //list: JSON.stringify(this.data,["title"])
            list : []
          };
        }
        
        UNSAFE_componentWillMount(){
          axios.get('http://localhost:4000/api/posts/').then(res =>{
         
          // 몽고에서 데이터 가져옴
          var arr = [];
          for(var i=0; i<res.data.length;i++){
            arr.push(res.data[i].title)
          }
          this.setState({
              list: arr
            });
        })
      }
        
        render() {
          return (
            <div className="content">
              <div className="container">  
                <List items={this.state.list} />
              </div>
            </div>
          );
        }
      }
      
      class List extends React.Component {
          constructor(props) {
              super(props);
              this.state = {
                  filtered: [],
                  isOpen : false,
                  value: ""
              };
              this.toggleContainer = React.createRef();
              this.handleChange = this.handleChange.bind(this);
              this.handleSubmit = this.handleSubmit.bind(this); 
              
              this.onClickHandler = this.onClickHandler.bind(this);
              this.onclickOutsideHandler = this.onclickOutsideHandler.bind(this);
          }
          
          componentDidMount() {
            window.addEventListener('click', this.onclickOutsideHandler);
          this.setState({
            filtered: this.props.items
          });
        }
          componentWillUnmount(){
            window.removeEventListener('click', this.onclickOutsideHandler);
          }

      
        componentWillReceiveProps(nextProps) {
          this.setState({
            filtered: nextProps.items
          });
        }
          
          handleChange(e) {
              // Variable to hold the original version of the list
          let currentList = [];
              // Variable to hold the filtered list before putting into state
          let newList = [];
          
          this.setState({
            value : e.target.value
          })
          
              // If the search bar isn't empty
          if (e.target.value !== "") {
                  // Assign the original list to currentList
            currentList = this.props.items;
                  
                  // Use .filter() to determine which items should be displayed
                  // based on the search terms
            newList = currentList.filter(item => {
                      // change current item to lowercase
              const lc = item.toLowerCase();
                      // change search term to lowercase
              const filter = e.target.value.toLowerCase();
                      // check to see if the current list item includes the search term
                      // If it does, it will be added to newList. Using lowercase eliminates
                      // issues with capitalization in search terms and search content
              return lc.includes(filter);
            });
          } else {
                  // If the search bar is empty, set newList to original task list
            newList = this.props.items;
          }
              // Set the filtered state based on what our rules added to newList
          this.setState({
            filtered: newList
          });
        }

          handleSubmit(e){
            e.preventDefault();
          }

          handleKeyPress(target){
            if(target.charCode===13){
              history.push(`/?title=${this.state.value}`);
            }
          }

          onClickHandler(){
            this.setState(currentState=>({
              isOpen : !currentState.isOpen
            }))
          }

          onclickOutsideHandler(event){
            if (this.state.isOpen && !this.toggleContainer.current.contains(event.target)){
              this.setState({isOpen: false});
            }
          }

          
            render() {
              return (
                  <div style={{width:'100%'}} ref={this.toggleContainer}>
                      <div style={{width:'83%',float:'left', margin:'0rem'}}>
                        <input type="text" className="input" onChange={this.handleChange} onClick = {this.onClickHandler} value={this.state.value} placeholder = "Search..." onKeyPress={e => this.handleKeyPress(e)}/>
                            {this.state.isOpen && (
                              <ul>
                                {this.state.filtered.map(item => (
                                    <li key={item}>
                                      <Link to={`/?title=${item}`}>
                                        {item}
                                      </Link>
                                    </li>
                                ))}
                            </ul>
                            )}
                        </div>
                        < div style={{float:'right', marginLeft:'0.1rem'}}>      
                        <Link to={`/?title=${this.state.value}`}>
                        <input type="button" className="input" value="검색" style={{width:'3.4rem', height:'2.5rem', textAlign:'center'}}/>
                        </Link>
                        </div>
                  </div>
              )
            }
        }
    return <App/>
  };

  export default withRouter(Search);