package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	sc "github.com/hyperledger/fabric/protos/peer"
)

// SmartContract structure
type SmartContract struct {
}

// borrowApplication example simple Chaincode implementation
type borrowApplication struct {
	//ApplicationNo     string `json:"applicationNo"`
	SystemNo          string `json:"systemNo"`
	ProjectName       string `json:"projectName"`
	DataQuantity      string `json:"dataQuantity"`
	StartDate         string `json:"startDate"`
	EndDate           string `json:"endDate"`
	Authorizer        string `json:"authorizer"`
	ApplicationStatus string `json:"applicationStatus"`
}

//Init method is called as a result of deployment "borrowApplication"
func (s *SmartContract) Init(stub shim.ChaincodeStubInterface) sc.Response {
	fmt.Println("borrowApplication Init")
	return shim.Success(nil)
}

//Invoke method is called as a result of an application request to run the Smart Contract "borrowApplication"
func (s *SmartContract) Invoke(APIstub shim.ChaincodeStubInterface) sc.Response {

	// Retrieve the requested Smart Contract function and arguments
	function, args := APIstub.GetFunctionAndParameters()
	// Route to the appropriate handler function to interact with the ledger
	if function == "createApplication" {
		return s.createApplication(APIstub, args)
	} else if function == "queryApplication" {
		return s.queryApplication(APIstub, args)
	}
	return shim.Error("Invalid Smart Contract function name.")
}
func (s *SmartContract) createApplication(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	var applicationNo string

	applicationNo = "1"

	if len(args) != 6 {
		return shim.Error("Incorrect number of arguments. Expecting 6")
	}

	var borrowApplication = borrowApplication{SystemNo: args[0], ProjectName: args[1], DataQuantity: args[2], StartDate: args[3], EndDate: args[4], Authorizer: args[5]}

	borrowApplicationAsBytes, _ := json.Marshal(borrowApplication)
	APIstub.PutState(applicationNo, borrowApplicationAsBytes)

	return shim.Success(nil)
}

func (s *SmartContract) queryApplication(APIstub shim.ChaincodeStubInterface, args []string) sc.Response {

	if len(args) != 1 {
		return shim.Error("Incorrect number of arguments. Expecting 1")
	}

	borrowApplicationAsBytes, _ := APIstub.GetState(args[0])
	return shim.Success(borrowApplicationAsBytes)
}

// The main function is only relevant in unit test mode. Only included here for completeness.
func main() {
	// Create a new Smart Contract
	err := shim.Start(new(SmartContract))
	if err != nil {
		fmt.Printf("Error creating new Smart Contract: %s", err)
	}
}
