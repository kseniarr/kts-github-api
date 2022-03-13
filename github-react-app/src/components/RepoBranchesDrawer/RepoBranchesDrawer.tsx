import React, { useEffect } from "react";

import RepoBranchesStore from "@store/RepoBranchesStore";
import { useLocalStore } from "@utils/useLocalStore";
import { Drawer } from "antd";
import { List } from "antd";
import { observer } from "mobx-react-lite";
import { useNavigate, useParams } from "react-router-dom";

type RepoBranchesDrawerProps = {
    onClose: () => void;
    orgName: string;
};

const RepoBranchesDrawer: React.FC<RepoBranchesDrawerProps> = ({
    onClose,
    orgName,
}) => {
    const { repoName } = useParams();
    const navigate = useNavigate();
    const repoBranchesStore = useLocalStore(() => new RepoBranchesStore());

    useEffect(() => {
        if (repoBranchesStore.branchesList === []) {
            navigate("/repos");
        } else {
            const func = async () => {
                await repoBranchesStore.getOrganizationRepoBranchesList({
                    organizationName: orgName,
                    repoName: repoName,
                });
            };
            if (repoName !== undefined) func();
        }
    }, [repoName]);

    return (
        <>
            {repoName !== undefined && (
                <Drawer
                    onClose={onClose}
                    title={repoName}
                    size="large"
                    visible={true}
                >
                    <h3>Branches:</h3>
                    <List
                        dataSource={repoBranchesStore.branchesList?.map(
                            (element) => {
                                return (
                                    <div key={element.branchName}>
                                        {element.branchName}
                                    </div>
                                );
                            }
                        )}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Drawer>
            )}
        </>
    );
};

export default observer(RepoBranchesDrawer);
