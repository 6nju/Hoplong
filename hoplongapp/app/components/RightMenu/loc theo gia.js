<Text style={[styles.item_h1, {marginTop: 40,marginBottom:10,}]}>Lọc Theo Giá</Text>
        
		<View style={{flexDirection:'row',flexWrap: 'wrap'}}>
		<View style={styles.section2}>
		                	<TextInput
		                        style={[styles.brand_title_box,{width: width*.5 -40}]}
		                        placeholder="Từ"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(from) => this.setState({ from })}
								value={from}
		                      />
                		</View>
		<View style={styles.section2}>
		                	<TextInput
		                        style={[styles.brand_title_box,{width: width*.5 -40}]}
		                        placeholder="Đến"
		                        placeholderTextColor="#8d8d8d"
								autoCorrect={false}
								returnKeyType='done'
								onChangeText={(to) => this.setState({ to })}
								value={to}
		                      />
                		</View>
                		</View>