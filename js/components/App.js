const GIPHY_API_URL = 'https://api.giphy.com';
const GIPHY_PUB_KEY = 'fO1VOAOqD4XV6bdDHJ9Q8DJ5NfEtChVv';


App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {},
            error: undefined
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        this.getGif(searchingText, function(err, gif) {
            this.setState({
                loading: false,
                searchingText: searchingText,
                error: err ? err.message : undefined,
                gif: err ? undefined : gif
            });
        }.bind(this));
    },

    getGif: function(searchingText, callback) {
        const url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function() {
            if (xhr.status === 200) {
                let data = JSON.parse(xhr.responseText).data;
                    let gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    callback(undefined, gif);
            }
        };
        xhr.onerror = function() {
            callback(new Error ({
                error: 'Nie działa'
            }));
        }
        xhr.send();
    },

    render: function() {

        const styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch} />
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />
                <p>error</p>
            </div>
        );
    }
});

